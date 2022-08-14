import { AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChildren } from '@angular/core';

import { DataSets } from './../../../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { settlementTemplate } from './../../../../../core/models/settlement.model';

@Component({
	selector: 'app-payroll-settlement-template-list',
	templateUrl: './payroll-settlement-template-list.component.html',
	styleUrls: ['./payroll-settlement-template-list.component.scss'],
})
export class PayrollSettlementTemplateListComponent implements OnInit {
	pageTitle: string = ' لیست قالب های تسویه حساب ';

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: settlementTemplate[];

	start_year: number;
	contract_year: number;

	selectedMovie: any;

	filtered_type: string;
	settlement_type: DataSets[];

	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		private seo: SeoService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		// set jalali curent year
	}
	async ionViewWillEnter() {
		this.getData();
		this.setTitle();
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.settlement_type = value.settlement_type;
			}
		});
		console.log(this.settlement_type);
	}

	ChangeSearch(event: any) {
		// this.getData(event.detail.value.toString());
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('settlementTemplate/filteredList', {
				limit: this.limit,
				offset: this.offset,
				filtered_type: this.filtered_type,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					this.total = res.totalRows;
					this.dataList = res.list.map((item: any) => {
						return new settlementTemplate().deserialize(item);
					});

					console.log(this.dataList);
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	pageChange($event: any) {
		this.CurrentPage = $event;
		this.offset = this.limit * this.CurrentPage - this.limit;
		this.getData();
	}

	removeTax(item: settlementTemplate) {
		this.global
			.showAlert('حذف ' + this.pageTitle, 'آیا برای حذف اطمینان دارید؟', [
				{
					text: 'بلی',
					role: 'yes',
					cssClass: 'dark',
				},
				{
					text: 'خیر',
					role: 'cancel',
					cssClass: 'medium',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('settlementTemplate/delete', {
								id: item.id,
							})
							.subscribe(
								async (res: any) => {
									await this.global.dismisLoading();

									this.offset = 0;
									this.CurrentPage = 1;
									this.getData();

									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}
}
