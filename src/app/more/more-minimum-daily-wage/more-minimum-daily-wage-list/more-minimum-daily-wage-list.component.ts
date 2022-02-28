import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonInput } from '@ionic/angular';

import { basicYears } from 'src/app/core/models/basicYears.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import * as moment from 'jalali-moment';
import { minimumDailyWage } from 'src/app/core/models/minimumdailywage.model';

@Component({
  selector: 'app-more-minimum-daily-wage-list',
  templateUrl: './more-minimum-daily-wage-list.component.html',
  styleUrls: ['./more-minimum-daily-wage-list.component.scss'],
})
export class MoreMinimumDailyWageListComponent implements OnInit {

	pageTitle: string = "حداقل دستمزد روزانه";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: minimumDailyWage[];
	dataInSearch: boolean = false;
	currentYear : number;

	year : number ;

	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) { }

	ngOnInit() {
		// set jalali curent year
		this.currentYear = parseInt(moment().locale('fa').format('YYYY'));

	}
	async ionViewWillEnter() {
		this.getData();
	}

	ChangeSearch(event:any){
		// this.getData(event.detail.value.toString());
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('salaryBaseInfo/minimumWageList', {
			limit: this.limit,
			offset: this.offset,
			year: this.year,

		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new minimumDailyWage().deserialize(item);
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

}
