import {
	formTemplate,
	formTemplateType,
} from './../../core/models/form-template.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-form-template-list',
	templateUrl: './form-template-list.component.html',
	styleUrls: ['./form-template-list.component.scss'],
})
export class FormTemplateListComponent implements OnInit {
	pageTitle: string = 'قالب های فرم ';

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: formTemplate[];
	dataInSearch: boolean = false;
	currentYear: number;
	filtered_name: string;
	formTemplateTypeList: formTemplateType[];
	formTemplateTypeNameHint:any={};
	filtered_form_type_id:number

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) {}

	ngOnInit() {}

	async ionViewWillEnter() {
		this.getFormType();
		this.getData();
		this.setTitle();
	}

	ChangeSearch(event: any) {
		// this.getData(event.detail.value.toString());
	}


	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('formTemplate/filteredList', {
				limit: this.limit,
				offset: this.offset,
				filtered_name: this.filtered_name,
				filtered_form_type_id: this.filtered_form_type_id,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					this.total = res.totalRows;
					this.dataList = res.list.map((item: any) => {
						return new formTemplate().deserialize(item);
					});
					// console.log(this.dataList);
					// console.log(res:any);
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}
	async getFormType() {
		// await this.global.showLoading();
		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		this.global.httpGet('formType/getFormType').subscribe(
			async (res: any) => {
				// this.global.dismisLoading();
				this.formTemplateTypeList = res.map(
					(type: formTemplateType) => {
						this.formTemplateTypeNameHint[type.id]=type.fa_name
						return new formTemplateType().deserialize(type);
					}
				);
				console.log(this.formTemplateTypeNameHint);
				console.log(this.formTemplateTypeList);
			},
			async (error: any) => {
				// this.global.dismisLoading();

				this.global.showError(error);
			}
		);
	}

	pageChange($event: any) {
		// console.log($event)
		this.CurrentPage = $event;
		this.offset = this.limit * this.CurrentPage - this.limit;
		this.getData();
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	removeItem(item: formTemplate) {
		this.global
			.showAlert(
				'حذف قالب فرم',
				`آیا برای حذف ${item.name} اطمینان دارید؟`,
				[
					{
						text: 'بلی',
						role: 'yes',
					},
					{
						text: 'خیر',
						role: 'cancel',
					},
				]
			)
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('formTemplate/delete', {
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
