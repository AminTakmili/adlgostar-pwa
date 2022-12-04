import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonInput } from '@ionic/angular';
import { citiesClass } from 'src/app/core/classes/cities.class';
import { globalData } from 'src/app/core/data/global.data';
import { User, UserRole } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-users-all-edit',
  templateUrl: './users-all-edit.component.html',
  styleUrls: ['./users-all-edit.component.scss'],
})
export class UsersAllEditComponent implements OnInit {

	pageTitle: string = "ویرایش کاربر";
	editForm: FormGroup;
	address: FormArray;
	gender: any = globalData.gender;
	province: citiesClass[] = [];
	userrole : UserRole[];
	dataList : User;
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
		private route: ActivatedRoute,
	) {
		this.employerImage = null;
		this.editForm = this.fb.group({
			role_id : ['',Validators.compose([Validators.required])],
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			national_code: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
			mobile: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
			email: ['', Validators.compose([ Validators.email])],
			gender: ['', Validators.compose([Validators.required])],
			born_at: ['', Validators.compose([Validators.required])],
			birth_place: ['', Validators.compose([Validators.required])],
			birth_certificate_code: ['', Validators.compose([Validators.required])],
			birth_certificate_issuance_place: ['', Validators.compose([Validators.required])],
			addresses: this.fb.array([]),
			image: [''],
			password: [],
			confirmPassword: [],
		});

		// this.address = this.editForm.get('addresses') as FormArray;
	}
	addresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
			phone: ['', Validators.compose([ Validators.maxLength(11)])],
		})
	}
	get addressFormGroup(): FormArray {
		return this.editForm.get('addresses') as FormArray
	}

	ngOnInit() {

	}
	async ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
		this.setTitle();
		this.extraData();
	}
	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}
	async getData(id: string) {


		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('user/detail', {
			id: id,
		}).subscribe(async (res: any) => {
			await this.global.dismisLoading();

			this.dataList = new User().deserialize(res);
			console.log(this.dataList);

			const address: FormGroup[] = this.dataList.addresses.map((item) => {

				const formAddress = this.fb.group({
					city_id: [item.city_id, Validators.compose([Validators.required])],
					address: [item.address, Validators.compose([Validators.required])],
					postal_code: [item.postal_code, Validators.compose([Validators.pattern("^[0-9]*$")])],
					phone: [item.phone, Validators.compose([Validators.pattern("^[0-9]*$")])],
				});
				return formAddress
			});

			console.log(address.length);
			if(address.length){}

			this.editForm = this.fb.group({
				id: [id, Validators.compose([Validators.required])],
				role_id: [this.dataList.role.id, Validators.compose([Validators.required])],
				first_name: [this.dataList.first_name, Validators.compose([Validators.required])],
				last_name: [this.dataList.last_name, Validators.compose([Validators.required])],
				birth_certificate_code: [this.dataList.birth_certificate_code, Validators.compose([Validators.required])],
				national_code: [this.dataList.national_code, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
				mobile: [this.dataList.mobile, Validators.compose([Validators.required])],
				birth_place: [this.dataList.birth_place, Validators.compose([Validators.required])],
				born_at: [this.dataList.born_at, Validators.compose([Validators.required])],
				birth_certificate_issuance_place: [this.dataList.birth_certificate_issuance_place, Validators.compose([Validators.required])],
				gender: [this.dataList.gender, Validators.compose([Validators.required])],
				email: [this.dataList.email, Validators.compose([Validators.email])],
				 image: [],
				addresses: this.fb.array( address.length ? address :[ this.addresses()] ),
				password: [],
				confirmPassword: [],
			});

			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error: any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});

	}
	extraData() {
		const countries = this.global.httpGet('more/countries');
		const userRole = this.global.httpPost('user/role/list', {limit : 300 , offset : 0 ,type : "user" });
		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([countries , userRole])
			.subscribe(([countriesData ,userRoleRes = '' ]) => {
				this.province = this.global.createCountry(countriesData);
				this.userrole = this.global.createUserRole(userRoleRes);
				const index = this.userrole.findIndex(x=> x.is_default_employer_role === 1 );
				this.userrole.splice(index,1);
			});
	}


	async onSubmit() {
		this.editForm.markAllAsTouched();
		console.log(this.editForm);
		const padVlidation=this.editForm.value.password?this.paswordChecker.totalValid&&this.editForm.value.password==this.editForm.value.confirmPassword:true

		if (padVlidation&&this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('user/edit', this.editForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/users/list');
					this.global.showToast('کاربر با نام ' + this.editForm.value.first_name + ' ' + this.editForm.value.last_name + ' ویرایش شد .');
					this.editForm.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	uploadFile(event: any) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.editForm.patchValue({
					image: reader.result
				});

				this.cd.markForCheck();
			};
		}
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
