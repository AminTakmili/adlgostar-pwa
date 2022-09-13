import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
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
import * as moment from 'jalali-moment';
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
	businessId: string;

	constructor(
		private navCtrl: NavController,
		public global: GlobalService,
		private seo: SeoService,
		public route: ActivatedRoute
	) {

	}

	ngOnInit() {
		// this.getData()
	}

	async ionViewWillEnter() {
		this.businessId = this.route.snapshot.queryParamMap.get('business_id');
		this.monthNumber = Number(  this.route.snapshot.queryParamMap.get('month'));
		this.yeraNumber = Number(this.route.snapshot.queryParamMap.get('year'));


		console.log(
			moment(new Date(), 'YYYY-M-D HH:mm:ss')
				.locale('fa')
				.format('YYYY/M/D HH:mm:ss')
		);

		console.log(moment(new Date(), 'jYYYY/jM/jD'));
		// console.log(this.global.baseData);
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.yearsList = value.years;
			}
		});
		this.monthList = this.global.monthList;

		this.setTitle();
		if (!this.route.snapshot.queryParamMap.get('year')) {

			this.yeraNumber = Number(
				moment(new Date(), 'YYYY-M-D HH:mm:ss').locale('fa').format('YYYY')
			);
			
		}
		if ( !this.route.snapshot.queryParamMap.get('month')) {
			
			this.monthNumber = Number(
				moment(new Date(), 'YYYY-M-D HH:mm:ss').locale('fa').format('M')
			);
		}
		// this.yeraNumber = Number(
		// 	moment(new Date(), 'YYYY-M-D HH:mm:ss').locale('fa').format('YYYY')
		// );

		
		console.log(this.businessId);
		if (this.businessId) {
		console.log("object");
			this.getBusinessById(this.businessId);
		} else {
			// this.loadbusiness();
			this.loadBusiness();
		}
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
	businessChange() {
		if (this.businessId) {
			this.loadBusiness();
		}
	}
	async getBusinessById(filtered_business_id: string = null) {
		await this.global.showLoading();
		console.log(filtered_business_id);
		this.global
			.httpPost('business/filteredList', {
				filtered_business_id,
				
				limit: 1000,
				offset: 0,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(of(res.list), res.list[0].id);
					this.businesslist$ = of(
						res.list.map((item: any) => {
							return new BusinessList().deserialize(item);
						})
					);

					this.business_id = res.list[0]?.id;
					this.getData();
				},
				async (error: any) => {
					await this.global.dismisLoading();

					this.global.showError(error);
					console.log(error);
				}
			);
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
			list: e,
		};
		// console.log(sendObj);
		await this.global.showLoading();
		await this.global
			.httpPost('payroll/addBusinessPayrollList', sendObj)
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					// console.log(res);
					this.global.showToast(
						'فیش حقوقی ثبت شد',
						800,
						'top',
						'success'
					);
					this.navCtrl.navigateForward('/payrolls/payroll/list');
				},
				async (error: any) => {
					await this.global.dismisLoading();
					await this.global.showError(error);
					// console.log(error);
				}
			);
	}
}
