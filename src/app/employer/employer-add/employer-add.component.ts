import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, IonInput } from '@ionic/angular';
import { citiesClass } from 'src/app/core/classes/cities.class';
import { globalData } from 'src/app/core/data/global.data';
import { StaticData } from 'src/app/core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { EmployerPrevComponent } from '../employer-prev/employer-prev.component';

@Component({
	selector: 'app-employer-add',
	templateUrl: './employer-add.component.html',
	styleUrls: ['./employer-add.component.scss'],
})
export class EmployerAddComponent implements OnInit {

	pageTitle: string = "کارفرما جدید";
	addForm: FormGroup;
	address: FormArray;
	gender: any = globalData.gender;
	province: citiesClass[] = [];
	StaticData : StaticData;
	employerImage: File | null;
	
	paswordChecker = {
		minLengthFive: false,
		hasCharecter: false,
		hasNumber: false,
		hasEnglishWord: false,
		totalValid: false,
	};
	paswordBarValue: number = 0;
	paswordBarColor: string = 'danger';

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private cd: ChangeDetectorRef,
		public modalController: ModalController
	) {
		this.employerImage = null;
		this.addForm = this.fb.group({
			first_name: ['', Validators.compose([Validators.required]), , 'نام'],
			last_name: ['', Validators.compose([Validators.required])],
			birth_certificate_code: ['', Validators.compose([Validators.required])],
			national_code: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
			mobile: ['', Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])],
			birth_place: ['', Validators.compose([Validators.required])],
			born_at: ['', Validators.compose([Validators.required])],
			birth_certificate_issuance_place: ['', Validators.compose([Validators.required])],
			gender: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([ Validators.email])],
			addresses: this.fb.array([this.addresses()]),
			image: [''],
			password: [],
			confirmPassword: [],
		});

		this.address = this.addForm.get('addresses') as FormArray;
	}
	addresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10)])],
			phone: ['', Validators.compose([Validators.maxLength(11)])],
		})
	}
	get addressFormGroup(): FormArray {
		return this.addForm.get('addresses') as FormArray;
	}

	async ngOnInit() {
		this.setTitle();
		this.getData();

		await this.global.baseData.subscribe(value => {
			if (value) {
				this.StaticData = value;
			}
		});
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}
	getData() {
		const countries = this.global.httpGet('more/countries');
		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([countries])
			.subscribe(([countriesData]) => {
				this.province = this.global.createCountry(countriesData);
			});
	}
	goToBusbusinesses() {

		this.global.showAlert('افزودن کسب وکار',
		'آیا میخواهید کسب و کار جدید نیز ثبت کنید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					this.navCtrl.navigateForward('/businesses/add')
				}else{
					this.navCtrl.navigateForward('/employers')
				}
			});
		});
	}



	async onSubmit(AddAnOther : boolean = false) {

		this.addForm.markAllAsTouched();
		// console.log(this.addForm)
		// console.log(this.addForm.value)
		const padVlidation=this.addForm.value.password?this.paswordChecker.totalValid&&this.addForm.value.password==this.addForm.value.confirmPassword:true

		if (padVlidation&&this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('employer/add', this.addForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);

					this.global.showToast('کارفرما با نام ' + this.addForm.value.first_name + ' ' + this.addForm.value.last_name + ' ثبت شد .');
					this.addForm.reset();
					if(!AddAnOther){this.goToBusbusinesses();}else{location.reload();}
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	uploadFile(event: any ) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.addForm.patchValue({
					image: reader.result
				});

				this.cd.markForCheck();
			};
		}
	}

	async showPrew(){

		const modal = await this.modalController.create({
			component: EmployerPrevComponent,
			cssClass: 'my-custom-class',
			componentProps: {
				data: this.addForm.value,
				gender : this.StaticData.gender,
				province : this.province

			  }
		  });
		  return await modal.present();
	}
	checkPassword(e: any) {
		const totalPattern = /^[a-zA-Z0-9$@$!%*/?&#^-_. +]+$/;
		const charPattern = /^[$@$!%*/?&#^-_. +]+$/;
		const wordPattern = /^[a-zA-Z]+$/;
		const numPattern = /^[0-9]+$/;
		const value = e.detail.value;
		if (!value) {
			this.paswordChecker = {
				minLengthFive: false,
				hasCharecter: false,
				hasNumber: false,
				hasEnglishWord: false,
				totalValid: false,
			};
		}

		if (totalPattern.test(value)) {
			this.paswordChecker = {
				minLengthFive: false,
				hasCharecter: false,
				hasNumber: false,
				hasEnglishWord: false,
				totalValid: false,
			};
			this.paswordChecker.minLengthFive = value.length >= 5;
			value.split('').map((item: any, index: number) => {
				if (numPattern.test(item)) {
					this.paswordChecker.hasNumber = true;
				}
				if (wordPattern.test(item)) {
					this.paswordChecker.hasEnglishWord = true;
				}
				if (charPattern.test(item)) {
					this.paswordChecker.hasCharecter = true;
				}
			});
		} else {
			// console.log(value.split('')[value.split('').length - 1]);
			// console.log(
			// 	wordPattern.test(value.split('')[value.split('').length - 1])
			// );
			if (value) {
				this.global.showToast(
					'لطفا فقط از کارکترهای مجاز و حروف انگلیسی استفاده کنید ',
					800,
					'top',
					'danger',
					'ios'
				);
			}
		}
		this.paswordChecker.totalValid =
			this.paswordChecker.hasCharecter &&
			this.paswordChecker.hasEnglishWord &&
			this.paswordChecker.hasNumber &&
			this.paswordChecker.minLengthFive;
		// console.log('////////////////////////////////////////');
		// console.log(this.paswordChecker);
		this.setPaswordValidtionBarValue(this.paswordChecker);
	}
	setPaswordValidtionBarValue(paswordChecker: any) {
		this.paswordBarValue = 0;

		if (paswordChecker.hasCharecter) {
			this.paswordBarValue += 0.25;
		}
		if (paswordChecker.hasEnglishWord) {
			this.paswordBarValue += 0.25;
		}
		if (paswordChecker.hasNumber) {
			this.paswordBarValue += 0.25;
		}
		if (paswordChecker.minLengthFive) {
			this.paswordBarValue += 0.25;
		}
		this.setPaswordValidtionBarColor();
	}
	setPaswordValidtionBarColor() {
		if (this.paswordBarValue <= 0.25) {
			this.paswordBarColor = 'danger';
		}
		if (this.paswordBarValue <= 0.5 && this.paswordBarValue > 0.25) {
			this.paswordBarColor = 'warning-orang';
		}
		if (this.paswordBarValue <= 0.75 && this.paswordBarValue > 0.5) {
			this.paswordBarColor = 'warning';
		}
		if (this.paswordBarValue <= 1 && this.paswordBarValue > 0.75) {
			this.paswordBarColor = 'success';
		}
	}
	togglePasswordShow(input: IonInput) {
		// console.log(input);
		// console.log(input);
		// console.log(input.type);
		if (input.type == 'password') {
			input.type = 'text';
		} else {
			input.type = 'password';
		}
		// console.log(input);
	}

}
