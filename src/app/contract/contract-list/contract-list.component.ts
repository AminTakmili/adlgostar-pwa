import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonInput } from '@ionic/angular';

import { BusinessList } from 'src/app/core/models/business.model';
import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { Employee } from 'src/app/core/models/employee.model';
import { Employer } from 'src/app/core/models/employer.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-contract-list',
	templateUrl: './contract-list.component.html',
	styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {

	pageTitle: string = "قرار داد ها";

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: contract[];

	start_year: number;
	contract_year: number;

	filtered_business_id: number;
	filtered_employer_id: number;
	filtered_employee_id: number;

	businessList: BusinessList[] = [];
	employeeList: Employee[] = [];
	empoloyerList: Employer[] = [];


	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) { }

	ngOnInit() {
		// set jalali curent year

	}
	async ionViewWillEnter() {
		this.getData();
		this.setTitle();
		this.getFilters();
	}

	ChangeSearch(event: any) {
		// this.getData(event.detail.value.toString());
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contract/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_business_id : this.filtered_business_id,
			filtered_employer_id : this.filtered_employer_id,
			filtered_employee_id : this.filtered_employee_id,

		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new contract().deserialize(item);
			});
			console.log(this.dataList);

		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	getFilters() {
		// const countries = this.global.httpGet('more/countries');
		const business = this.global.httpPost('business/filteredList',
			{ limit: 2000, offset: 0 }
		);

		const empoloyer = this.global.httpPost('employee/filteredList',
			{ limit: 2000, offset: 0 }
		);

		const employee = this.global.httpPost('employee/filteredList',
			{ limit: 2000, offset: 0 }
		);

		this.global.parallelRequest([business, empoloyer, employee])
			.subscribe(([businessRes, empoloyerRes = '', employeeRes = '']) => {

				this.CreateBusiness(businessRes);
				this.CreateEmployer(empoloyerRes);
				this.CreateEmployee(employeeRes);

			});
	}

	changeFilter(){
		this.CurrentPage = 1;
		this.offset = 0;
		this.getData();
	}
	CreateBusiness(data: any) {
		this.businessList = data.list.map((item: any) => {
			return new BusinessList().deserialize(item);
		});
		console.log(this.businessList);
	}
	CreateEmployer(data: any) {
		this.empoloyerList = data.list.map((item: any) => {
			return new Employer().deserialize(item);
		});
		console.log(this.empoloyerList);
	}
	CreateEmployee(data: any) {
		this.employeeList = data.list.map((item: any) => {
			return new Employee().deserialize(item);
		});
		console.log(this.employeeList);
	}

	removeItem(item: contractExtraField) {
		this.global.showAlert('حذف قرار داد', 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert: any) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('salaryBaseInfo/contractExtraField', {
						id: item.id,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData();

						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
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

}
