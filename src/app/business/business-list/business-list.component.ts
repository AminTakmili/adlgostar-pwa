import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { fromEvent } from 'rxjs';
import { BusinessList } from 'src/app/core/models/business.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { debounceTime, map } from 'rxjs/operators';


@Component({
	selector: 'app-business-list',
	templateUrl: './business-list.component.html',
	styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit {

	pageTitle : string = "کسب کار ها";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	businessList: BusinessList[];
	dataInSearch : boolean = false

	@ViewChild('Search') Search: IonInput;

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

		setTimeout(async () => {
			fromEvent(await this.Search.getInputElement() , "input").pipe(
				debounceTime(1000),
				map(event => {
					this.getData(this.Search.value.toString());
				}),
			).subscribe();
		}, 2000);
	}

	async getData(name: string = '') {
		this.dataInSearch = name ? true : false;

		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('business/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_name: name,
		}).subscribe(async (res) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.businessList = res.list.map((item: any) => {
				return new BusinessList().deserialize(item);
			});
			console.log(this.businessList);
			// console.log(res);
		}, async (error) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	pageChange($event : any) {
		console.log($event)
		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}
}
