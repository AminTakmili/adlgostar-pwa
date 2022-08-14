import { AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChildren } from '@angular/core';

import { BusinessList } from 'src/app/core/models/business.model';
import { DataSets } from './../../../../core/models/StaticData.model';
import { Employee } from 'src/app/core/models/employee.model';
import { Employer } from 'src/app/core/models/employer.model';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
// import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { workingHourList } from './../../../../core/models/payroll-base-info.model';

@Component({
	selector: 'app-payroll-base-info-working-hour-list',
	templateUrl: './payroll-base-info-working-hour-list.component.html',
	styleUrls: ['./payroll-base-info-working-hour-list.component.scss'],
})
export class PayrollBaseInfoWorkingHourListComponent implements OnInit {
	pageTitle: string = ' ساعت های موظفی';

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: workingHourList[];

	start_year: number;
	contract_year: number;

	selectedMovie: any;
	yeraNumber!: number;
	monthNumber!: number;
	yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;

	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		// set jalali curent year
	}
	async ionViewWillEnter() {
		// console.log(this.global.baseData);
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.yearsList = value.years;
			}
		});
		this.monthList = this.global.monthList;

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
			.httpPost('workingHour/filteredList', {
				limit: this.limit,
				offset: this.offset,
				filtered_month:this.monthNumber,
				filtered_year:this.yeraNumber
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

	removeWorkingHour(item: workingHourList) {
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
							.httpDelete('workingHour/delete', {
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
