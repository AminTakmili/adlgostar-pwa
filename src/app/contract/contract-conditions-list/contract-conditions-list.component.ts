import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { contractConditions } from 'src/app/core/models/contractConstant.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-contract-conditions-list',
	templateUrl: './contract-conditions-list.component.html',
	styleUrls: ['./contract-conditions-list.component.scss'],
})
export class ContractConditionsListComponent implements OnInit {

	pageTitle: string = "شروط ضمن عقد قرار داد";

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: contractConditions[];
	dataInSearch: boolean = false;
	currentYear : number;


	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) { }

	ngOnInit() { }

	async ionViewWillEnter() {
		this.getData();
		this.setTitle();
	}

	ChangeSearch(event:any){
		// this.getData(event.detail.value.toString());
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contractProvisoTemplate/list', {
			limit: this.limit,
			offset: this.offset,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new contractConditions().deserialize(item);
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


	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	removeItem(item : contractConditions){
		this.global.showAlert('حذف '+ this.pageTitle , 'آیا برای حذف اطمینان دارید؟', [
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
					this.global.httpDelete('contractProvisoTemplate/delete', {
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
}
