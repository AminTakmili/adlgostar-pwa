import { recognizanceTemplate } from './../../../core/models/recognizance.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-recognizance-template-list',
  templateUrl: './recognizance-template-list.component.html',
  styleUrls: ['./recognizance-template-list.component.scss'],
})
export class RecognizanceTemplateListComponent implements OnInit {

  pageTitle: string = "قالب های تعهدنامه ";

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: recognizanceTemplate[];
	dataInSearch: boolean = false;
	currentYear : number;
  filtered_name:string

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
		this.global.httpPost('recognizanceTemplate/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_name: this.filtered_name,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new recognizanceTemplate().deserialize(item);
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

	removeItem(item : recognizanceTemplate){
		this.global.showAlert('حذف قالب تعهد نامه' , `آیا برای حذف ${item.name} اطمینان دارید؟`, [
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
					this.global.httpDelete('recognizanceTemplate/delete', {
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
