import { BusinessList } from 'src/app/core/models/business.model';
import { SeoService } from 'src/app/core/services/seo.service';
import { DataSets } from 'src/app/core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
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
import { payroll } from 'src/app/core/models/payroll-base-info.model';

@Component({
	selector: 'app-payroll-list-new-add',
	templateUrl: './payroll-list-new-add.component.html',
	styleUrls: ['./payroll-list-new-add.component.scss'],
})
export class PayrollListNewAddComponent implements OnInit {
	pageTitle: string = 'افزودن فیش حقوقی';

	datasList: payroll[] = [];

	yeraNumber!: number;
	monthNumber!: number;
	yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;

	businesslist$: Observable<BusinessList[]>;
	businessInputLoading = false;
	businessInput$ = new Subject<string>();
	minLengthTerm = 3;
	business_id: number;
	loading: boolean = false;

	constructor(public global: GlobalService, private seo: SeoService) {}

	ngOnInit() {
		// this.getData()
		this.loadBusiness();
	}
	async ionViewWillEnter() {
		// console.log(this.global.baseData);
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.yearsList = value.years;
			}
		});
		this.monthList = this.global.monthList;

		// console.log(this.monthList,	this.yearsList);
		// this.getData();
		this.setTitle();
	}
	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	async getData() {
		this.datasList = [];

		if (this.monthNumber && this.yeraNumber && this.business_id) {
			this.loading = true;

			await this.global.showLoading();
			this.global
				.httpPost('payroll/businessPayrollList', {
					business_id: this.business_id,
					year: this.yeraNumber,
					month: this.monthNumber,
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						//  console.log(res);
						this.datasList = res.list.map((item: payroll) => {
							return new payroll().deserialize(item);
						});

						this.businesslist$ = of([]);

						this.loadBusiness();
						// console.log( this.datasList);
						this.loading = false;
					},
					async (error: any) => {
						await this.global.dismisLoading();
						await this.global.showError(error);
						this.loading = false;
					}
				);
			//  console.log( this.datasList);
		}
		// console.log( this.datasList);
	}
	loadBusiness() {
		this.businesslist$ = concat(
			of([]), // default items
			this.businessInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.businessInputLoading = true)),
				switchMap((term) => {
					return this.getbusiness(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.businessInputLoading = false))
					);
				})
			)
		);
	}

	getbusiness(term: string = null): Observable<any> {
		return this.global
			.httpPost('business/filteredList', {
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
							return new BusinessList().deserialize(item);
						});
					}
				})
			);
	}

	async onSubmit(e: any) {
		let sendObj = {
			business_id: this.business_id,
			month: this.monthNumber,
			year: this.yeraNumber,
			detail: e,
		};
		console.log(sendObj);
		await this.global.showLoading();
		await this.global
			.httpPost('payroll/addBusinessPayrollList', sendObj)
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(res);
				},
				async (error: any) => {
					await this.global.dismisLoading();
					await this.global.showError(error);
					console.log(error);
				}
			);
	}
}
