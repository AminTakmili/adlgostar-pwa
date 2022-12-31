import { formTemplateType } from './../../core/models/form-template.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ClipboardService } from 'ngx-clipboard';
import { globalData } from 'src/app/core/data/global.data';
import { contractTemplateVariable } from 'src/app/core/models/contractConstant.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-form-template-edit',
  templateUrl: './form-template-edit.component.html',
  styleUrls: ['./form-template-edit.component.scss'],
})
export class FormTemplateEditComponent implements OnInit {

	pageTitle: string = " ویرایش قالب فرم ";

	editForm: FormGroup;

	// businessCatgeories: businessClass[] = [];

	conditionType = globalData.conditionType;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;

	contractTemplateVariableList : contractTemplateVariable[];
	filterList : contractTemplateVariable[];
	formTemplateTypeList: formTemplateType[];


	// public Editor = ClassicEditor;
	editors = ['Classic', 'Inline'];
  id:string

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private clipboardApi: ClipboardService,
    private rout:ActivatedRoute
	) {
    this.id=rout.snapshot.paramMap.get('id')
		//
		this.editForm = this.fb.group({
      id:[this.id],
			name: ['', Validators.compose([Validators.required])],
			template: ['', Validators.compose([Validators.required])],
			form_type_id: [, Validators.compose([Validators.required])],

		
			// header_as_logo: [false],
		});
		//
		this.ckeConfig = {
			allowedContent: false,
			extraPlugins: 'divarea',
			forcePasteAsPlainText: true,
			removePlugins: 'exportpdf,font',
			language: "fa",
			font_defaultLabel: 'IRANSans'
		};
	}

	ngOnInit() {
		this.setTitle();
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

	async getData() {

		await this.global.showLoading()
		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		const formTypeReq = this.global.httpGet('formType/getFormType');
		const formTemplateDetail = this.global.httpPost('formTemplate/detail',{id:this.id});
		this.global.parallelRequest([  formTypeReq,formTemplateDetail])
			.subscribe(([  formTypeRes = '', formTemplateDetailRes = '' ]) => {
				// this.setBussinessCategory(businessCategory);
				this.global.dismisLoading()
				this.setdetail(formTemplateDetailRes)
				this.setFormType(formTypeRes);
			});
	}
	async setFormType(data:any) {
		// await this.global.showLoading();
		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		// this.global.httpGet('formType/getFormType').subscribe(
		// 	async (res: any) => {
				this.global.dismisLoading();
				this.formTemplateTypeList = data.map(
					(type: formTemplateType) => {
						return new formTemplateType().deserialize(type);
					}
				);
				this.getFormTemplateVariable();
		// 		// console.log(this.formTemplateTypeList);
		// 	},
		// 	async (error: any) => {
		// 		this.global.dismisLoading();

		// 		this.global.showError(error);
		// 	}
		// );
	}
	getFormTemplateVariable() {
		this.global
			.httpPost('formType/getFormTemplateVariable', {
				form_type_id: this.editForm.value.form_type_id,
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
  setdetail(data:any){

    this.editForm.patchValue(data)
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

	formTemplateeVariable(data : any){
		this.contractTemplateVariableList = data.map((category: any) => {
			return new contractTemplateVariable().deserialize(category);
		});
		this.filterList = this.contractTemplateVariableList;
		// console.log(this.contractTemplateVariableList);
	}

	async onSubmit() {
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('formTemplate/edit', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/form/template');
					this.global.showToast('قالب فرم با نام  ' + this.editForm.value.name + ' ویرایش شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	// async ChangeBusinessCat(){
	// 	const business_category_ids = this.editForm.value.business_categories;
	// 	await this.global.showLoading('لطفا منتظر بمانید...');
	// 	this.global.httpPost('businessCategory/business/list', {
	// 		business_category_ids
	// 	}).subscribe(async (res:any) => {

	// 		await this.global.dismisLoading();
	// 		this.business = res.map((item : any)=>{
	// 			return new BusinessList().deserialize(item);
	// 		});

	// 	}, async (error:any) => {
	// 		await this.global.dismisLoading();
	// 		this.global.showError(error);
	// 	});
	// }

	copyText(item : any){
		this.clipboardApi.copyFromContent(item.variable);
		this.global.showToast('مقدار  '+item.variable+' با موفقیت کپی شد' ,
			1000
		);
	}

	ChangeSearch(event: any){
		if(event.detail.value ){
			this.filterList = this.global.filterItems(this.contractTemplateVariableList, event.detail.value);
		}else{
			this.filterList = this.contractTemplateVariableList;
		}
	}


}
