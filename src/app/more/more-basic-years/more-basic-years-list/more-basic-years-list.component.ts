import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonInput } from '@ionic/angular';

import { basicYears } from 'src/app/core/models/basicYears.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import * as moment from 'jalali-moment';

@Component({
	selector: 'app-more-basic-years-list',
	templateUrl: './more-basic-years-list.component.html',
	styleUrls: ['./more-basic-years-list.component.scss'],
})
export class MoreBasicYearsListComponent implements OnInit {

	pageTitle: string = "پایه سنوات";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: basicYears[];
	dataInSearch: boolean = false;
	currentYear : number;

	start_year : number ;
	contract_year : number ;

	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) { }

	ngOnInit() {
		// set jalali curent year
		this.currentYear = parseInt(moment().locale('fa').format('YYYY'));
		this.contract_year = this.currentYear;
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
		this.global.httpPost('salaryBaseInfo/severanceBaseList', {
			limit: this.limit,
			offset: this.offset,
			start_year: this.start_year,
			contract_year: this.contract_year,
		}).subscribe(async (res) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new basicYears().deserialize(item);
			});
			// console.log(this.dataList);
			// console.log(res);
		}, async (error) => {
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
}
