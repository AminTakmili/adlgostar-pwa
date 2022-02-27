import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { globalData } from 'src/app/core/data/global.data'
import { citiesClass } from 'src/app/core/classes/cities.class';
import { businessClass } from 'src/app/core/classes/business.class';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from 'src/app/core/services/seo.service';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-business-add',
	templateUrl: './business-add.component.html',
	styleUrls: ['./business-add.component.scss'],
})
export class BusinessAddComponent implements OnInit {

	disable = true;
	employerList = [
		{ id: this.global.user.id, name: this.global.user.firstName + ' ' + this.global.user.lastName, selected: true },
	];
	employer = this.global.user.id;
	businessAddress: any = [1]

	addresses: FormArray;
	////////////////////
	personType = globalData.personType;
	province: citiesClass[] = [];
	businessCatgeories: businessClass[] = [];
	businessForm: FormGroup;

	categoryLimit = 1000;
	categoryoffSet = 0;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		this.businessForm = this.fb.group({
			employer_id: [this.global.user.id, Validators.compose([Validators.required])],
			name: ['', Validators.compose([Validators.required])],
			employer_type: ['', Validators.compose([Validators.required])],
			registration_number: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			business_license_number: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			national_id: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			business_category_id: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
			addresses: this.fb.array([this.newAddresses()]),

		});
		this.addresses = this.businessForm.get('addresses') as FormArray;

	}

	get addressFormGroup(): FormArray {
		return <FormArray>this.businessForm.get('addresses');
	}

	newAddresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			phone: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
		})
	}
	ngOnInit() {

		this.getData();
		this.setTitle();
	}


	getData() {
		const countries = this.global.httpGet('more/countries');
		const businessCategory = this.global.httpPost('businessCategory/list', { limit: this.categoryLimit, offset: this.categoryoffSet });


		this.global.parallelRequest([countries, businessCategory])
			.subscribe(([countriesData, businessCategory]) => {

				this.setCountry(countriesData);
				this.setBussinessCategory(businessCategory);
			});
	}
	setTitle() {
		this.seo.generateTags({
			title: 'افزودن کسب و کار جدید',
			description: 'کسب و کار جدی ',
			keywords: "کسب و کار جدی",
			isNoIndex: false,
		});
	}

	setSelectedPeople() {

	}

	setCountry(data: any) {
		data[0].provinces.map((province: any) => {
			province.cities.map((city: any) => {
				const cities: citiesClass = new citiesClass();
				cities.id = city.id
				cities.name = city.name;
				cities.provinceId = province.id;
				cities.province = province.name;
				this.province.push(cities);
			});
		});

	}
	setBussinessCategory(data: any) {
		data.list.map((category: any) => {
			category.child.map((business: any) => {
				const businessData: businessClass = new businessClass();
				businessData.id = business.id
				businessData.name = business.name;
				businessData.parentId = category.id;
				businessData.parentName = category.name;
				this.businessCatgeories.push(businessData);
			});
		});
	}

	addAnotherAdress() {
		this.businessAddress.push(this.businessAddress.length + 1);
		this.addresses.push(this.newAddresses());
		// console.log(this.addressFormGroup);
	}

	removeAddress(index: number) {

		this.global.showAlert('حذف آدرس',
		'آیا برای حذف آدرس اطمینان دارید ؟ ',
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
					this.businessAddress.splice(index, 1);
					this.addresses.removeAt(index);
				}
			});
		});
	}

	async onSubmit() {

		if (this.businessForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('business/add', this.businessForm.value)
				.subscribe(async (res) => {

					await this.global.dismisLoading();
					// console.log(res);
					this.navCtrl.navigateForward('/businesses');
					this.businessForm.reset();
					this.global.showToast('کسب و کار جدید با نام ' + this.businessForm.value.name + ' ثبت شد .');
				}, async (error) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}



}
