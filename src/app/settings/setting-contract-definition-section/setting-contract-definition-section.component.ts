import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/core/models/post.model';
import { SeoService } from 'src/app/core/services/seo.service';
import { UserType } from 'src/app/core/models/user.model';
import { error } from 'src/app/core/models/other.models';

@Component({
	selector: 'app-setting-contract-definition-section',
	templateUrl: './setting-contract-definition-section.component.html',
	styleUrls: ['./setting-contract-definition-section.component.scss'],
})
export class SettingContractDefinitionSectionComponent implements OnInit {
	pageTitle: string = 'انتخاب پست جدید برای افزودن قرارداد ';
	addForm: FormGroup;
	limit: number = 100;
	offset: number = 0;
	total: number = 0;
	loading = false;
	end: boolean = false;
	// searchVal : string;

	dataList: UserType[] = [];
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		this.addForm = this.fb.group({
			section_id: ['', Validators.compose([Validators.required])],
		});
	}

	async ngOnInit() {
		
	}

	async getData() {
		if (this.dataList.length > 0 && this.end) {
			return;
		}
		this.loading = true;
		this.global
			.httpPost('user/role/list', {
				limit: this.limit,
				offset: this.offset,
			})
			.subscribe(
				async (res: any) => {
					console.log(res);
					this.total = res.totalRows;
					this.loading = false;
					if (res.list.length < this.limit) {
						this.end = true;
					}
					this.offset = this.offset + this.limit;

					const data = res.list.map((item: any) => {
						return new UserType().deserialize(item);
						// this.dataList.push(data);
					});
					this.dataList = this.dataList.concat(data);
					// this.dataList.concat(data);
					console.log(this.dataList);
				},
				async (error: any) => {
					this.loading = false;
					this.global.showError(error);
				}
			);
	}

	onScrollToEnd() {
		// console.log('onScroll');
		this.end = true;
		// this.getData();
	}

	onScroll({ end }: any) {
		// console.log(end + this.limit, this.dataList.length)
		if (this.loading || this.total <= this.dataList.length) {
			// console.log('end 1');
			return;
		}

		if (end + this.limit >= this.dataList.length) {
			// console.log('end 2');
			this.getData();
		}
	}

	// searchFun(event:any){
	// 	this.searchVal = event.term;
	// 	this.loading = true;
	// 	this.offset = 0;
	// 	this.end = false;
	// 	this.getData();
	// }

async	ionViewWillEnter() {
		this.setTitle();
		await this.getData();
		await this.global.showLoading()
		this.global
			.httpGet('setting/getContractDefinitionSection')
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading()
				if (res && res.section_id) {
					this.addForm
						.get('section_id')
						.setValue(Number(res.section_id));
				}
				},
				async (error: any) => {
				
					await this.global.dismisLoading()
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

	async onSubmit() {
		console.log(this.addForm.value.section_id);
		console.log(this.dataList.find((item)=>{return item.id==this.addForm.value.section_id}).name);
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost(
					'setting/setContractDefinitionSection',
					this.addForm.value
				)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						
						this.global.showToast(
							' درخواست ثبت قرارداد از طریق تیکت به بخش ' +
							this.dataList.find((item)=>{return item.id==this.addForm.value.section_id}).name +
								' محول شد .',
								1700,
								'top',
								'success',
								'ios'
						);
						this.navCtrl.navigateForward('/')
						this.addForm.reset();
						
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}
}
