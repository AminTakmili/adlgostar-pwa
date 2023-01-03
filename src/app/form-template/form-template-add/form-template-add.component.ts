import { formTemplateType } from './../../core/models/form-template.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ClipboardService } from 'ngx-clipboard';
import { businessClass } from 'src/app/core/classes/business.class';
import { globalData } from 'src/app/core/data/global.data';
import { BusinessList } from 'src/app/core/models/business.model';
import { contractTemplateVariable } from 'src/app/core/models/contractConstant.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-form-template-add',
	templateUrl: './form-template-add.component.html',
	styleUrls: ['./form-template-add.component.scss'],
})
export class FormTemplateAddComponent implements OnInit {
	pageTitle: string = 'افزودن قالب فرم جدید';

	addForm: FormGroup;

	businessCatgeories: businessClass[] = [];

	conditionType = globalData.conditionType;
	@ViewChild('myckeditor') ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;

	business: BusinessList[] = [];
	formTemplateeVariableList: contractTemplateVariable[];
	filterList: contractTemplateVariable[];
	formTemplateTypeList: formTemplateType[];

	// public Editor = ClassicEditor;
	editors = ['Classic', 'Inline'];

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private clipboardApi: ClipboardService
	) {
		//
		this.addForm = this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			template: ['', Validators.compose([Validators.required])],
			form_type_id: [1, Validators.compose([Validators.required])],

			// header_as_logo: [false],
		});
		//
		this.ckeConfig = {
			allowedContent: false,
			extraPlugins: 'divarea',
			forcePasteAsPlainText: true,
			removePlugins: 'exportpdf,font',
			language: 'fa',
			font_defaultLabel: 'IRANSans',
		};
	}

	ngOnInit() {
		this.setTitle();
		// this.getData();
		this.getFormType();
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	// getData() {

	// 	// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
	// 	const formTemplateeVariable = this.global.httpGet('formTemplate/variableList');
	// 	this.global.parallelRequest([  formTemplateeVariable])
	// 		.subscribe(([  formTemplateeVariableRes = '' ]) => {
	// 			// this.setBussinessCategory(businessCategory);
	// 			this.formTemplateeVariable(formTemplateeVariableRes);
	// 		});
	// }
	async getFormType() {
		await this.global.showLoading();
		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		this.global.httpGet('formType/getFormType').subscribe(
			async (res: any) => {
				this.global.dismisLoading();
				this.formTemplateTypeList = res.map(
					(type: formTemplateType) => {
						return new formTemplateType().deserialize(type);
					}
				);
				this.getFormTemplateVariable();
				// console.log(this.formTemplateTypeList);
			},
			async (error: any) => {
				this.global.dismisLoading();

				this.global.showError(error);
			}
		);
	}
	getFormTemplateVariable() {
		this.global
			.httpPost('formType/getFormTemplateVariable', {
				form_type_id: this.addForm.value.form_type_id,
				from_form:0
			})
			.subscribe(
				async (res: any) => {
					console.log(res);
					this.formTemplateeVariable(res);
				},
				async (error: any) => {}
			);
	}

	// setBussinessCategory(data: any) {
	// 	data.list.map((category: any) => {
	// 		category.child.map((business: any) => {
	// 			const businessData: businessClass = new businessClass();
	// 			businessData.id = business.id
	// 			businessData.name = business.name;
	// 			businessData.parentId = category.id;
	// 			businessData.parentName = category.name;
	// 			this.businessCatgeories.push(businessData);
	// 		});
	// 	});
	// }

	formTemplateeVariable(data: any) {
		this.formTemplateeVariableList = data.map((category: any) => {
			return new contractTemplateVariable().deserialize(category);
		});
		this.filterList = this.formTemplateeVariableList;
		// console.log(this.contractTemplateVariableList);
	}

	async onSubmit() {
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('formTemplate/add', this.addForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						this.navCtrl.navigateForward('/form/template/list');
						this.global.showToast(
							'قالب فرم با نام  ' +
								this.addForm.value.name +
								' ثبت شد .'
						);
						this.addForm.reset();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}

	async ChangeBusinessCat() {
		const business_category_ids = this.addForm.value.business_categories;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('businessCategory/business/list', {
				business_category_ids,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					this.business = res.map((item: any) => {
						return new BusinessList().deserialize(item);
					});
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	copyText(item: any) {
		this.clipboardApi.copyFromContent(item.variable);
		this.global.showToast(
			'مقدار  ' + item.variable + ' با موفقیت کپی شد',
			1000
		);
	}

	ChangeSearch(event: any) {
		if (event.detail.value) {
			this.filterList = this.global.filterItems(
				this.formTemplateeVariableList,
				event.detail.value
			);
		} else {
			this.filterList = this.formTemplateeVariableList;
		}
	}
}
