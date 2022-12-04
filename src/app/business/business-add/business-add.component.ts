import { Employer } from './../../core/models/employer.model';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { globalData } from 'src/app/core/data/global.data'
import { citiesClass } from 'src/app/core/classes/cities.class';
import { businessClass } from 'src/app/core/classes/business.class';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SeoService } from 'src/app/core/services/seo.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	switchMap,
	tap,
	map,
	filter,
} from 'rxjs/operators';


@Component({
	selector: 'app-business-add',
	templateUrl: './business-add.component.html',
	styleUrls: ['./business-add.component.scss'],
})
export class BusinessAddComponent implements OnInit {

	disable = true;
	employerList : any ;
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
	
	employerlist$: Observable<Employer[]>;
	inputLoading = false;
	employerInput$ = new Subject<string>();
	selectedMovie: any;
	minLengthTerm = 3;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private router: Router
	) {
		this.businessForm = this.fb.group({
			employer_ids: [ [], Validators.compose([Validators.required])],
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
		return this.businessForm.get('addresses') as FormArray;
	}

	newAddresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10)])],
			phone: ['', Validators.compose([Validators.required,Validators.maxLength(11)])],
		}) ;
	}

	loadEmployee() {
		this.employerlist$ = concat(
			of([]), // default items
			this.employerInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.inputLoading = true)),
				switchMap((term) => {
					return this.getEmployee(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.inputLoading = false))
					);
				})
			)
		);
	}

	getEmployee(term: string = null): Observable<any> {
		return this.global
			.httpPost('employer/filteredList', {
				filtered_name: term,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.pipe(
				map((resp) => {
					if (resp.Error) {
						throwError(resp.Error);
					} else {
						return  this.global.createEmployer(resp)
					}
				})
			);
	}
	clearEmployerlist(){
		this.employerlist$=of([])
	}
	ngOnInit() {


		this.getData();
		this.setTitle();
		this.loadEmployee()
	}


	getData() {
		const countries = this.global.httpGet('more/countries');
		const businessCategory = this.global.httpPost('businessCategory/list', { limit: this.categoryLimit, offset: this.categoryoffSet });
		const employerList = this.global.httpPost('employer/filteredList', { limit: 1000, offset: this.categoryoffSet });


		this.global.parallelRequest([countries, businessCategory , employerList])
			.subscribe(([countriesData, businessCategory  ='', employerRes = '']) => {

				this.province = this.global.createCountry(countriesData);
				this.setBussinessCategory(businessCategory);
				this.employerList =  this.global.createEmployer(employerRes)
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

	async onSubmit(AddAnOther : boolean = false) {

		this.businessForm.markAllAsTouched();
		if (this.businessForm.valid)
		{
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('business/add', this.businessForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.global.showToast('کسب و کار جدید با نام ' + this.businessForm.value.name + ' ثبت شد .');
					this.businessForm.reset();
					if(!AddAnOther){
						this.navCtrl.navigateForward('/businesses');
					}else{
						location.reload();
					}

				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}


	checkControll(item : any){
		console.log(item.controls.address);
	}



}
