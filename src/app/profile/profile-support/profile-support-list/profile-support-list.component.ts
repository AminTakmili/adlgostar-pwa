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

	limitReceive: number = 10;
	offsetReceive: number = 0;
	totalReceive: number = 0;
	CurrentPageReceive: number = 1;
	endReceive = false;

	limitSend: number = 10;
	offsetSend: number = 0;
	totalSend: number = 0;
	CurrentPageSend: number = 1;
	endSend = false;
	Searching = 0;
	receiveDataList: Support[];
	sendDataList: Support[];
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

		const receive=this.global.httpPost('profile/userTicket/filteredList', {
			limit: this.limitReceive,
			offset: this.offsetReceive,
			filtered_type:'receive'
		})
		const send=this.global.httpPost('profile/userTicket/filteredList', {
			limit: this.limitSend,
			offset: this.offsetSend,
			filtered_type:'send'
		})
		
		this.dataInSearch = name ? true : false;
		await this.global.showLoading('لطفا منتظر بمانید...');
	this.global.parallelRequest([receive,send]).subscribe(
		async ([ receiveRes  ='', sendRes ={totalRows:0,list:[]}]) => {
			await this.global.dismisLoading();
			console.log(sendRes,receiveRes);
			this.totalSend = sendRes.totalRows;
			this.totalReceive = receiveRes.totalRows;
			this.receiveDataList = receiveRes.list.map((item: any) => {
				return new Support().deserialize(item);
			});
			this.sendDataList = sendRes.list.map((item: any) => {
				return new Support().deserialize(item);
			});
			console.log(this.sendDataList,'sendDataList');
			console.log(this.receiveDataList,'receiveDataList');
			// console.log(res:any);
		}, async ([receiveError,sendError]) => {
			await this.global.dismisLoading();
			this.global.showError(receiveError);
			this.global.showError(sendError);
		});

		
		// this.global.parallelRequest([receive, send ])
		// 	.subscribe(([receiveRes, sendRes  ={totalRows:0,}]) => {

		// 		this.totalSend = sendRes.totalRows;
		// 	this.totalReceive = receiveRes.totalRows;
		// 	this.receiveDataList = receiveRes.list.map((item: any) => {
		// 		return new Support().deserialize(item);
		// 	});
		// 	this.sendDataList = sendRes.list.map((item: any) => {
		// 		return new Support().deserialize(item);
		// 	});
		// 	});

	}

	pageChangeSend($event: any) {
		this.CurrentPageSend = $event;
		this.offsetSend = (this.limitSend * this.CurrentPageSend) - this.limitSend;
		this.getData();
	}
	pageChangeReceive($event: any) {
		this.CurrentPageReceive = $event;
		this.offsetReceive = (this.limitReceive * this.CurrentPageReceive) - this.limitReceive;
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
			replyText = " پاسخ فرستند";
		}else if(text === "closed"){
			replyText = "بسته شده" ;
		}
		else if(text === "referred"){
			replyText = "ارجاع داده شده" ;
		}
		return replyText;
	}


}
