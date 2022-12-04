import { StorageService } from './../../core/services/storage.service';
import { error } from 'src/app/core/models/other.models';
import { ContractExtendModalComponent } from './../contract-extend-modal/contract-extend-modal.component';
import { sentence } from './../../core/models/sentence.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { Post } from 'src/app/core/models/post.model';

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
					this.total = res.totalRows;
					// let domyList:[sentence]=[new sentence().deserialize( res.list[0])]
					this.SentenceList = res.list.map(
						(item: sentence, index: number) => {
							return new sentence().deserialize(item);
						}
					);
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

	async openExtendModal(type: string) {
		// await this.global.showLoading('لطفا منتظر بمانید...');

		const modal = await this.modalController.create({
			component: ContractExtendModalComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			//   presentingElement:this.routerOutlet.nativeEl,
			swipeToClose: true,
			componentProps: {
				employeeList: this.dataList.employee_info,
				contract_id :this.route.snapshot.paramMap.get('id'),
				type,
			},
		});

		modal.onWillDismiss().then(async (res) => {
			if (res.data && res.data.dismissed) {
				// console.log(res.data.city['id'])
				console.log(res);
				if (type == 'requestExtend') {
					this.requestExtend(res.data.list, res.data.postList);
				} else if (type == 'sendExtend') {
					this.sendExtend(res.data.list);
				}
				// console.log(id)
				// await this.global.dismisLoading();
				// if (id==='Origin') {
				//   this.OriginInputValue=res.data.city.name
				//   this.OriginCityId=res.data.city['id']
				//   if (res.data.loctionAdress) {
				// 	// console.log(res.data.loctionAdress);
				// 	this.OriginLoctionAdress=res.data.loctionAdress
				//   }

				// }
				// if (id==='destination') {
				//   this.destinationInputValue=res.data.city.name
				//   this.destinationCityId=res.data.city['id']
				//   if (res.data.loctionAdress) {
				// 	// console.log(res.data.loctionAdress);
				// 	this.destinationLoctionAdress=res.data.loctionAdress
				//   }

				// }
			}
		});
		// 	modal.present().then(async(res) => {
		// 		// console.log(res);
		// 		// console.log("res");
		// 		await this.global.dismisLoading();

		//   });
		return await modal.present();
	}
	async sendExtend(data: any) {
		console.log(data);
		let senObj = data;
		senObj['contract_id'] = this.id;
		await this.global.showLoading();
		this.global.httpPost('contract/extendContract', senObj).subscribe(
			async (res: any) => {
				await this.global.dismisLoading();
				console.log(res);
				this.global.showToast(
					' تمدید قراداد با موفقیت ثبت شد ',
					700,
					'top',
					'success',
					'ios'
				);
				this.pageChange(1);
			},
			async (error: any) => {
				await this.global.dismisLoading();

				await this.global.showError(error);
			}
		);
	}
	async requestExtend(data: any, postList: Post[]) {
		console.log(data);
		console.log(postList);
		// let senObj=data
		// senObj['contract_id']=	this.id
		console.log(data, 'req');
		let postUl: string[] = [];
		let postContent: string = '';
		let content: string = '';

		if (
			data.business_employee_new_posts &&
			data.business_employee_new_posts
		) {
			data.business_employee_new_posts.map((item: any, index: number) => {
				let pUi: string = '';

				item.posts.map((post: any, indexPost: number) => {
					if (indexPost) {
						pUi +=
							'<li>' +
							postList?.find((postItem: Post) => {
								return postItem.id == post.post_id;
							})?.name +
							'</li>';
					} else {
						pUi =
							'<li>' +
							postList?.find((postItem: Post) => {
								return postItem.id == post.post_id;
							})?.name +
							'</li>';
					}
				});
				pUi = '<ul>' + pUi + '</ul>';
				pUi =
					'<ul><li>نام کارمند ' +
					Number(index + 1) +
					' : ' +
					this.dataList.employee_info.find((employee: any) => {
						return (
							employee?.business_employee_info?.id ==
							item.business_employee_id
						);
					})?.full_name +
					'</li>' +
					'<li> پست ها: ' +
					pUi +
					'</li></ul><hr >';
				postUl.push(pUi);
				// postUl=''
			});
			console.log(postUl);
			postContent =
				postUl && postUl.length
					? '<li><span> تغیر پست ها : </span>' +
					  postUl.join('') +
					  '</li> '
					: '';
		}
		content = `	<section>
		<ul>
			<li>نام قرارداد: ${this.dataList.title} </li>
			<li> شناسه قرارداد: <span> ${this.id} </span> </li>
			<li> تاریخ جدید پایان قرارداد : ${data.extend_date} </li>
			<li> دستمزد جدید: ${data.new_wage} </li>
			<li> نام کسب و کار : ${this.dataList.business_info.name} </li>
			${postContent}
			

		</ul>
		${postContent ? '' : '<p class="mx-10" >* پست کارمندی تغییر نکرده است!</p>'}
		${postContent ? '' : '<hr>'}
			
		
		<p class="mx-10" >
		${data.text}
		</p>



	</section>
	`;

		console.log(postContent);
		// document.getElementById('a').innerHTML = content;
		let subject = 'درخواست تمدید قرارداد';
		// let section_id =this.dataList.section_id
		let section_id = this.dataList.extend_contract_section_id;
		let type = 'extend_contract_request';
		await this.global.showLoading()
		this.global
			.httpPost('profile/userTicket/add', {
				content,
				subject,
				section_id,
				type,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading()
					this.global.showToast(
						' درخواست تمدید قراداد با موفقیت ثبت شد ',
						700,
						'top',
						'success',
						'ios'
					);

				},
				async (error: any) => {
					await this.global.dismisLoading()
					this.global.showError(error)
				}
			);
	}
}
