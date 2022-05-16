import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Employer } from 'src/app/core/models/employer.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.scss'],
})
export class EmployerListComponent implements OnInit {

	pageTitle: string = "کارفرمایان";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: Employer[];
	dataInSearch: boolean = false

	business_id: string;

	filtered_name: string;
	filtered_national_code: string;
	filtered_phone: string;



	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) {

	}

	ngOnInit() {

	}
	async ionViewWillEnter() {
		this.getData();
	}
	async getData(isSearch: boolean = false) {

		this.dataInSearch = isSearch;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('employer/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_name: this.filtered_name,
			filtered_national_code: this.filtered_national_code,
			filtered_phone: this.filtered_phone,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new Employer().deserialize(item);
			});
			console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});

	}

	pageChange($event: any) {
		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}
	removeItem(item : Employer){
		this.global.showAlert('حذف کارمند بندی', 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert : any) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('employer/delete', {
						id: item.id,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();
						this.pageChange(1);
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
