import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { contractConstant } from 'src/app/core/models/contractConstant.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-salary-constants-list',
  templateUrl: './more-salary-constants-list.component.html',
  styleUrls: ['./more-salary-constants-list.component.scss'],
})
export class MoreSalaryConstantsListComponent implements OnInit {


	pageTitle: string = "ثابت های حقوق";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: contractConstant[];
	dataInSearch: boolean = false;
	currentYear : number;

	start_year : number ;
	contract_year : number ;



	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) { }

	ngOnInit() {
		// set jalali curent year

		// this.contract_year = this.currentYear;
	}
	async ionViewWillEnter() {
		this.getData();
		this.setTitle();
	}

	ChangeSearch(event:any){
		// this.getData(event.detail.value.toString());
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('salaryBaseInfo/contractConstantFieldList' , {
			limit: this.limit,
			offset: this.offset,
			contract_year: this.contract_year,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new contractConstant().deserialize(item);
			});
			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	pageChange($event : any) {
		// console.log($event)
		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}


	ChangeYear(){
		this.CurrentPage = 1;
		this.getData();
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	removeItem(item : contractConstant){
		this.global.showAlert('حذف ', 'آیا برای حذف اطمینان دارید؟'+this.pageTitle, [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('salaryBaseInfo/contractConstantField', {
						id: item.id,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.ChangeYear();

						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}
}
