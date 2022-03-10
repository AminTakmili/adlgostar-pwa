import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { globalData } from 'src/app/core/data/global.data'
import { citiesClass } from 'src/app/core/classes/cities.class';
import { businessClass } from 'src/app/core/classes/business.class';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from 'src/app/core/services/seo.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Business, BusinessList } from 'src/app/core/models/business.model';


@Component({
	selector: 'app-business-edit',
	templateUrl: './business-edit.component.html',
	styleUrls: ['./business-edit.component.scss'],
})
export class BusinessEditComponent implements OnInit {

	disable = true;
	employerList = [
		{ id: this.global.user.id, name: this.global.user.first_name + ' ' + this.global.user.last_name, selected: true },
	];
	employer = this.global.user.id;
	pageTitle = "ویرایش کسب و کار";
	addresses: FormArray;
	////////////////////
	personType = globalData.personType;
	province: citiesClass[] = [];
	businessCatgeories: businessClass[] = [];
	businessForm: FormGroup;
	businessId: string;
	bussiness: Business;
	dataList : Business;
	categoryLimit = 1000;
	categoryoffSet = 0;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,

	) {

		this.businessForm = this.fb.group({
			business_id: ['', Validators.compose([Validators.required])],
			employer_id: ['', Validators.compose([Validators.required])],
			name: ['', Validators.compose([Validators.required])],
			employer_type: ['', Validators.compose([Validators.required])],
			registration_number: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			business_license_number: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			national_id: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			business_category_id: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
			addresses: this.fb.array([]),

		});

		this.businessId = this.route.snapshot.paramMap.get('businessId');
		this.addresses = this.businessForm.get('addresses') as FormArray;
	}



	get addressFormGroup(): FormArray {
		return this.businessForm.get('addresses') as FormArray;
	}

	newAddresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			phone: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
		})
	}
	async ngOnInit() {


	}

	async ionViewWillEnter(){
		await this.getDetail(this.route.snapshot.paramMap.get('id'))
		await this.getData();
		await this.setTitle();

	}

	async getDetail(id: string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('business/detail', {
			business_id: id,
		}).subscribe(async (res: any) => {
			await this.global.dismisLoading();

			this.dataList = new Business().deserialize(res);
			console.log(this.dataList);

			const address : FormGroup[] = this.dataList.addresses.map((item) => {

				const formAddress = this.fb.group({
					city_id: [item.city.id, Validators.compose([Validators.required])],
					address: [item.address, Validators.compose([Validators.required])],
					postal_code: [item.postal_code,  Validators.compose([Validators.minLength(10),Validators.maxLength(10)])],
					phone: [item.phone,  Validators.compose([Validators.minLength(11),Validators.maxLength(11)])],
				});
				return formAddress
			});



			this.businessForm = this.fb.group({
				business_id: [this.dataList.id, Validators.compose([Validators.required])],
				employer_id: [this.dataList.employer.id, Validators.compose([Validators.required])],
				name: [this.dataList.name, Validators.compose([Validators.required])],
				employer_type: [this.dataList.employer_type, Validators.compose([Validators.required])],
				registration_number: [this.dataList.registration_number, Validators.compose([Validators.pattern("^[0-9]*$")])],
				business_license_number: [this.dataList.business_license_number, Validators.compose([Validators.pattern("^[0-9]*$")])],
				national_id: [this.dataList.national_id, Validators.compose([Validators.pattern("^[0-9]*$")])],
				business_category_id: [this.dataList.business_category.id, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
				addresses: this.fb.array(address),
			});

			this.addresses = this.businessForm.get('addresses') as FormArray;
			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error: any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});

	}

	getData() {
		const countries = this.global.httpGet('more/countries');
		const businessCategory = this.global.httpPost('businessCategory/list', { limit: this.categoryLimit, offset: this.categoryoffSet });
		const employerList = this.global.httpPost('employer/list', { limit: 1000, offset: this.categoryoffSet });


		this.global.parallelRequest([countries, businessCategory , employerList])
			.subscribe(([countriesData, businessCategory  ='', employerRes = '']) => {

				this.province = this.global.createCountry(countriesData);
				this.setBussinessCategory(businessCategory);
				this.employerList =  this.global.createEmployer(employerRes)
			});
	}
	setTitle() {
		this.seo.generateTags({
			title: 'ویرایش کسب و کار ',
			description: 'ویرایش کسب و کار ',
			keywords: 'ویرایش کسب و کار ',
			isNoIndex: false,
		});
	}



	setCountry(data : any) {
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
		// this.province = data[0].provinces.map((province : any) => {
		// 	return new provinces().deserialize(province);
		// });
		// console.log(this.province)

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
		this.addresses.push(this.newAddresses());
		console.log(this.addressFormGroup);
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
					this.addresses.removeAt(index);
				}
			});
		});
	}

	async onSubmit() {

		if (this.businessForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('business/edit', this.businessForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/businesses');
					this.businessForm.reset();
					this.global.showToast('کسب و کار جدید با نام ' + this.businessForm.value.name + ' ثبت شد .');
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
