import { recognizance } from './../../../core/models/recognizance.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { error } from 'src/app/core/models/other.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-recognizance-detail',
  templateUrl: './recognizance-detail.component.html',
  styleUrls: ['./recognizance-detail.component.scss'],
})
export class RecognizanceDetailComponent implements OnInit {
	pageTitle: string;
	dataList: recognizance;

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	id!: string;
	is_employer!: boolean;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		public route: ActivatedRoute,
		public modalController: ModalController,
		private storage: StorageService

	) {}

	ngOnInit() {
		this.storage.get('user').then((val) => {
			if (Object.keys(val).length) {
				// console.log(val);
				// console.log(val.is_employer);
				this.is_employer = val.is_employer;
			}
		});
	}

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
	}

	async getData(id: string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('recognizance/detail', {
				id: id,
			})
			.subscribe(
				async (res: any) => {
				

					await this.global.dismisLoading();

					this.dataList = new recognizance().deserialize(res);
					this.pageTitle = this.dataList.title;
					this.setTitle();
				},
				async (error: any) => {
					await this.global.dismisLoading();
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
	removeContract(id: number, date: string) {
		this.global
			.showAlert(
				'حذف حکم تاریخ  ' + date,
				'آیا برای حذف اطمینان دارید؟',
				[
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
				]
			)
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('contractSentence/delete', {
								id,
							})
							.subscribe(
								async (res: any) => {
									await this.global.dismisLoading();

									this.offset = 0;
									this.CurrentPage = 1;
									this.getData(
										this.route.snapshot.paramMap.get('id')
									);

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
