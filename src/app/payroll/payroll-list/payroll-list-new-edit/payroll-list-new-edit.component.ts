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
	selector: 'app-payroll-list-new-edit',
	templateUrl: './payroll-list-new-edit.component.html',
	styleUrls: ['./payroll-list-new-edit.component.scss'],
})
export class PayrollListNewEditComponent implements OnInit {
	pageTitle: string = 'افزودن فیش حقوقی';

	datasList: payroll[] = [];

	yearNumber!: number;
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
	id: string;

	constructor(
		private navCtrl: NavController,
		public global: GlobalService,
		private seo: SeoService,
		public route: ActivatedRoute
	) {}

	ngOnInit() {
		// this.getData()
	}

	async ionViewWillEnter() {
		this.businessId = this.route.snapshot.queryParamMap.get('business_id');
		this.id = this.route.snapshot.queryParamMap.get('id');
		this.monthNumber = Number(
			this.route.snapshot.queryParamMap.get('month')
		);
		this.yearNumber = Number(this.route.snapshot.queryParamMap.get('year'));
		console.log(this.businessId);
		if (this.businessId) {
			this.getBusinessById(this.businessId);
		} else if (this.id) {
			console.log('object');
			this.getDataById();
		}

		// console.log(this.global.baseData);
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.yearsList = value.years;
			}
		});
		this.monthList = this.global.monthList;

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

		if (this.monthNumber && this.yearNumber && this.business_id) {
			this.loading = true;

			await this.global.showLoading();
			this.global
				.httpPost('payroll/detailBusinessPayrollList', {
					business_id: this.business_id,
					year: this.yearNumber,
					month: this.monthNumber,
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						console.log(res);
						this.datasList = res.list.map((item: payroll) => {
							return new payroll().deserialize(item);
						});

						this.businesslist$ = of([]);

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
	async getDataById() {
		this.datasList = [];

		await this.global.showLoading();
		this.global
			.httpPost('payroll/detail', {
				id: this.id,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(res);
					this.monthNumber = res.month;
					this.yearNumber = res.year;
					this.getBusinessById(res.business_id, false);
					this.business_id = res.business_id;
					this.datasList = res.list.map((item: payroll) => {
						return new payroll().deserialize(item);
					});

					this.businesslist$ = of([]);

					// console.log( this.datasList);
					this.loading = false;
				},
				async (error: any) => {
					await this.global.dismisLoading();
					await this.global.showError(error);
					this.loading = false;
				}
			);
	}

	async getBusinessById(
		filtered_business_id: string = null,
		wantset: boolean = true
	) {
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
					if (wantset) {
						this.getData();
					}
				},
				async (error: any) => {
					await this.global.dismisLoading();

					this.global.showError(error);
					console.log(error);
				}
			);
	}

	async onSubmit(e: any) {
		let sendObj = {
			list: e,
		};
		console.log(sendObj);
		await this.global.showLoading();
		await this.global
			.httpPatch('payroll/editBusinessPayrollList', sendObj)
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					// console.log(res);
					this.global.showToast(
						'فیش حقوقی ویرایش شد',
						800,
						'top',
						'success'
					);
					if (this.businessId) {
						this.navCtrl.navigateForward('/businesses/detail/'+this.businessId);
					}else{
            this.navCtrl.navigateForward('/payrolls/payroll/list');

          }
				},
				async (error: any) => {
					await this.global.dismisLoading();
					await this.global.showError(error);
					// console.log(error);
				}
			);
	}
}
