import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
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
			image: ['']
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



	async onSubmit(AddAnOther : boolean = false) {

		this.addForm.markAllAsTouched();
		console.log(this.addForm)
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('employer/add', this.addForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);

					this.global.showToast('کارفرما با نام ' + this.addForm.value.first_name + ' ' + this.addForm.value.last_name + ' ثبت شد .');
					this.addForm.reset();
					if(!AddAnOther){this.navCtrl.navigateForward('/employers');}else{location.reload();}
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

}
