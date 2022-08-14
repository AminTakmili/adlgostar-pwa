import { Component, OnInit } from '@angular/core';
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

import { DataSets } from './../../../core/models/StaticData.model';
import { Employer } from 'src/app/core/models/employer.model';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { Support } from 'src/app/core/models/supoort.model';

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

	employerlist$: Observable<Employer[]>;
	employerInputLoading = false;
	employerInput$ = new Subject<string>();
	minLengthTerm = 3;
	status:string='all'
	statusList:DataSets[]
	employer_id:string
	
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
	) {

	}

	async	ngOnInit() {
		this.setTitle();
		await this.global.baseData.subscribe(value => {
			if (value) {
				// this.StaticData = value;
				this.statusList=value.ticket_status
				console.log(this.statusList);
			}
		});
		this.loadEmployer()
		
	}
	async ionViewWillEnter() {
		this.getData();
	}
	loadEmployer() {
		this.employerlist$ = concat(
			of([]), // default items
			this.employerInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.employerInputLoading = true)),
				switchMap((term) => {
					return this.getEmployer(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.employerInputLoading = false))
					);
				})
			)
		);
	}

	getEmployer(term: string = null): Observable<any> {
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
						return resp.list.map((item: any) => {
							return new Employer().deserialize(item);
						});
					}
				})
			);
	}

	async getData(name: string = '') {

	await	this.global.showLoading()
	this.global.httpPost('profile/userTicket/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_status : this.status,
			filtered_employer_id : this.employer_id
		}).subscribe(
		async (res) => {
			// console.log(res);
		
			await this.global.dismisLoading();
			
			this.total = res.totalRows;
			
		
			this.dataList = res.list.map((item: any) => {
				return new Support().deserialize(item);
			});
		
		
		}, async (error) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		
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
