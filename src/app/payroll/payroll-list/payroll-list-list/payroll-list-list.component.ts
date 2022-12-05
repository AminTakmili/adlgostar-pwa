import { payrollList } from './../../../core/models/payroll-list.model';
import { AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChildren } from '@angular/core';

import { BusinessList } from 'src/app/core/models/business.model';
// import { DataSets } from './../../../../core/models/StaticData.model';
import { Employee } from 'src/app/core/models/employee.model';
import { Employer } from 'src/app/core/models/employer.model';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
// import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { workingHourList } from 'src/app/core/models/payroll-base-info.model';
import { DataSets } from 'src/app/core/models/StaticData.model';
// import { workingHourList } from './../../../../core/models/payroll-base-info.model';
import { Observable, Subject, concat, of, throwError } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-payroll-list-list',
  templateUrl: './payroll-list-list.component.html',
  styleUrls: ['./payroll-list-list.component.scss'],
})
export class PayrollListListComponent implements OnInit {

  pageTitle: string = ' فیش حقوقی';

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: payrollList[];

	start_year: number;
	contract_year: number;

	selectedMovie: any;
	employeeId:number
	businessId:number
  
	employeelist$: Observable<Employee[]>;
	employeeInputLoading = false;
	employeeInput$ = new Subject<string>();
  
	businesslist$: Observable<BusinessList[]>;
	businessInputLoading = false;
	businessInput$ = new Subject<string>();
	minLengthTerm = 3;
  

	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		// set jalali curent year
    this.loadBusiness()
    this.loadEmployee()
	}
	async ionViewWillEnter() {
		// console.log(this.global.baseData);

		// console.log(this.monthList,	this.yearsList);
		this.getData();
		this.setTitle();
	}

	ChangeSearch(event: any) {
		// this.getData(event.detail.value.toString());
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('payroll/filteredList', {
				limit: this.limit,
				offset: this.offset,
				filtered_employee_id:this.employeeId,
				filtered_business_id:this.businessId
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					this.total = res.totalRows;
					this.dataList = res.list.map((item: any) => {
						return new workingHourList().deserialize(item);
					});

					console.log(this.dataList);
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	changeFilter() {
		this.CurrentPage = 1;
		this.offset = 0;
		this.getData();
	}
  loadEmployee() {
		this.employeelist$ = concat(
			of([]), // default items
			this.employeeInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.employeeInputLoading = true)),
				switchMap((term) => {
					return this.getEmployee(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.employeeInputLoading = false))
					);
				})
			)
		);
	}

	getEmployee(term: string = null): Observable<any> {
		return this.global
			.httpPost('employee/filteredList', {
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
						return resp.list.map((item: any) => {
							return new Employee().deserialize(item);
						});
					}
				})
			);
	}

  loadBusiness() {
		this.businesslist$ = concat(
			of([]), // default items
			this.businessInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.businessInputLoading = true)),
				switchMap((term) => {
					return this.getbusiness(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.businessInputLoading = false))
					);
				})
			)
		);
	}

	getbusiness(term: string = null): Observable<any> {
		return this.global
			.httpPost('business/filteredList', {
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
						return resp.list.map((item: any) => {
							return new BusinessList().deserialize(item);
						});
					}
				})
			);
	}

	removeItem(item: contractExtraField) {
		this.global
			.showAlert('حذف قرار داد', 'آیا برای حذف اطمینان دارید؟', [
				{
					text: 'بلی',
					role: 'yes',
				},
				{
					text: 'خیر',
					role: 'cancel',
				},
			])
			.then((alert: any) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('salaryBaseInfo/contractExtraField', {
								id: item.id,
							})
							.subscribe(
								async (res: any) => {
									await this.global.dismisLoading();

									this.offset = 0;
									this.CurrentPage = 1;
									this.getData();

									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
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

	pageChange($event: any) {
		this.CurrentPage = $event;
		this.offset = this.limit * this.CurrentPage - this.limit;
		this.getData();
	}

	removePayrollHour(item: payrollList) {
		this.global
			.showAlert('حذف ' + this.pageTitle, 'آیا برای حذف اطمینان دارید؟', [
				{
					text: 'بلی',
					role: 'yes',
					cssClass: 'dark',
				},
				{
					text: 'خیر',
					role: 'cancel',
					cssClass: 'medium',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('payroll/delete', {
								id: item.id,
							})
							.subscribe(
								
								async (res: any) => {
									await this.global.dismisLoading();
									this.offset = 0;
									this.CurrentPage = 1;
									this.getData();
									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}

	confirmedPayrollHour(item: payrollList) {
		this.global
			.showAlert('تایید  ' + this.pageTitle,			
			 `آیا برای تایید فیش حقوقی ${this.global.getMonthName[item.month]} ماه سال ${item.year} ${item.full_name }  اطمینان دارید؟`, [
				{
					text: 'بلی',
					role: 'yes',
					cssClass: 'dark',
				},
				{
					text: 'خیر',
					role: 'cancel',
					cssClass: 'medium',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpPost('payroll/confirm', {
								id: item.id,
							})
							.subscribe(
								
								async (res: any) => {
									await this.global.dismisLoading();
									this.offset = 0;
									this.CurrentPage = 1;
									this.getData();
									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}
}
