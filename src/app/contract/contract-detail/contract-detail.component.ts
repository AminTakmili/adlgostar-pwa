import { sentence } from './../../core/models/sentence.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-contract-detail',
	templateUrl: './contract-detail.component.html',
	styleUrls: ['./contract-detail.component.scss'],
})
export class ContractDetailComponent implements OnInit {
	pageTitle: string;
	contractExtraFieldList: contractExtraField[];
	dataList: contract;
	SentenceList!: Array<sentence>;

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	id!: string;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		public route: ActivatedRoute
	) {}

	ngOnInit() {}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
		this.id = this.route.snapshot.paramMap.get('id');
		this.moreData();
	}

	async getData(id: string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('contract/detail', {
				id: id,
				with_replace: 0,
			})
			.subscribe(
				async (res: any) => {
					await this.getSentenceListData(
						this.route.snapshot.paramMap.get('id')
					);

					await this.global.dismisLoading();

					this.dataList = new contract().deserialize(res);
					this.pageTitle = this.dataList.title;
					this.setTitle();

					// console.log(this.dataList);
					// console.log(res:any);
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	moreData() {
		const contractExtra = this.global.httpGet(
			'salaryBaseInfo/contractExtraFieldList'
		);
		this.global
			.parallelRequest([contractExtra])
			.subscribe(([contractExtraRes]) => {
				this.CreatecontractExtra(contractExtraRes);
			});
	}

	CreatecontractExtra(data: any) {
		this.contractExtraFieldList = data.map((item: any) => {
			return new contractExtraField().deserialize(item);
		});
		console.log(this.contractExtraFieldList);
	}

	returnNameExtraField(id: number) {
		return this.contractExtraFieldList.find((x) => x.id === id).name;
	}
	async getSentenceListData(id: string) {
		// await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('contractSentence/filteredList', {
				filtered_contract_id: id,
				offset: this.offset,
				limit: this.limit,
			})
			.subscribe(
				async (res: any) => {
					// await this.global.dismisLoading();
					console.log(res);
					this.total = res.totalRows;
					// let domyList:[sentence]=[new sentence().deserialize( res.list[0])]
					this.SentenceList = res.list.map(
						(item: sentence, index: number) => {
							return new sentence().deserialize(item);
						}
					);

					//  console.log(this.dataList?.contract_info.employee_info);
					//  console.log(this.dataList?.contract_info.employers_info);

					// console.log(res:any);
				},
				async (error: any) => {
					// await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}
	pageChange($event: any) {
		this.CurrentPage = $event;
		this.offset = this.limit * this.CurrentPage - this.limit;
		this.getData(this.route.snapshot.paramMap.get('id'));
	}
	submitConfirm() {
		this.global
			.showAlert(
				'تایید قرارداد',
				'آیا برای تایید قرارداد اطمینان دارید ؟ ',
				[
					{
						text: 'خیر',
						role: 'cancel',
					},
					{
						text: 'بلی',
						role: 'yes',
						handler: async () => {
							await this.global.showLoading();
							this.global
								.httpPost('contract/confirm', { id: this.id })
								.subscribe(
									async (res: any) => {
										await this.global.dismisLoading();
										console.log(res);
										this.dataList.is_confirmed = 1;

										this.global.showToast(
											res.msg,
											500,
											'top',
											'success',
											'ios'
										);
									},
									async (error: any) => {
										await this.global.dismisLoading();

										this.global.showError(error);
									}
								);
						},
					},
				]
			)
			.then((alert) => {
				alert.present();
				// alert.onDidDismiss().then(async (e: any) => {
				// 	if (e.role === 'yes') {

				// 	}
				// });
			});
	}
	removeContract(id:number,date:string){
		this.global.showAlert('حذف حکم تاریخ  '+ date , 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes',
				cssClass: 'dark',
			},
			{
				text: 'خیر',
				role: 'cancel',
				cssClass: 'medium',
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {


					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('contractSentence/delete', {
						id
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData(this.route.snapshot.paramMap.get('id'));

						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}
}
