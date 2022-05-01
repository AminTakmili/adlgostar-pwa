import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Support } from 'src/app/core/models/supoort.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-profile-support-list',
	templateUrl: './profile-support-list.component.html',
	styleUrls: ['./profile-support-list.component.scss'],
})
export class ProfileSupportListComponent implements OnInit {

	pageTitle: string = 'پشتیبانی';

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: Support[];
	dataInSearch: boolean = false




	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
	) {

	}

	ngOnInit() {
		this.setTitle();
	}
	async ionViewWillEnter() {
		this.getData();
	}
	async getData(name: string = '') {

		this.dataInSearch = name ? true : false;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('profile/userTicket/list', {
			limit: this.limit,
			offset: this.offset,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new Support().deserialize(item);
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


	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	closetiket(item:Support){

	}


	returnStatus(text:string){
		let replyText ;
		if(text === "pending"){
			replyText = "در انتظار پاسخ";
		}else if(text === "replied"){
			replyText = "پاسخ داده شده";
		}else if(text === "responded"){
			replyText = "پاسخ کارفرما";
		}else if(text === "closed"){
			replyText = "بسته شده" ;
		}
		return replyText;
	}


}
