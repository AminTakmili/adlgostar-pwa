import { ClipboardService } from 'ngx-clipboard';
import { NavController } from '@ionic/angular';
import { SeoService } from './../../../core/services/seo.service';
import { GlobalService } from './../../../core/services/global.service';
import { contractTemplateVariable } from 'src/app/core/models/contractConstant.model';
import { BusinessList } from './../../../core/models/business.model';
import { CKEditorComponent } from 'ng2-ckeditor';
import { globalData } from 'src/app/core/data/global.data';
import { businessClass } from './../../../core/classes/business.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-template-add',
  templateUrl: './header-template-add.component.html',
  styleUrls: ['./header-template-add.component.scss'],
})
export class HeaderTemplateAddComponent implements OnInit {


	pageTitle: string = "افزودن قالب سربرگ قرار داد جدید";

	addForm: FormGroup;

	businessCatgeories: businessClass[] = [];

	conditionType = globalData.conditionType;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;

	business : BusinessList[] = [];
	contractTemplateVariableList : contractTemplateVariable[];
	filterList : contractTemplateVariable[];

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
			// type: ['', Validators.compose([Validators.required])],
			// business_categories: [[]],
			// businesses: [[]],
			// header_as_logo: [false],
		});
		//
		this.ckeConfig = {
			allowedContent: false,
			extraPlugins: 'divarea',
			forcePasteAsPlainText: true,
			removePlugins: 'exportpdf',
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

  getData() {

		const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		const contractTemplateVariable = this.global.httpGet('salaryBaseInfo/contractHeaderTemplateVariableList');
		this.global.parallelRequest([businessCategory , contractTemplateVariable])
			.subscribe(([businessCategory , contractTemplateVariableRes = '' ]) => {
				this.setBussinessCategory(businessCategory);
				this.setcontractTemplateVariab(contractTemplateVariableRes);
			});
	}

	setBussinessCategory(data: any) {
		data.list.map((category: any) => {
			category.child.map((business: any) => {
				const businessData: businessClass = new businessClass();
				businessData.id = business.id
				businessData.name = business.name;
				businessData.parentId = category.id;
				businessData.parentName = category.name;
				this.businessCatgeories.push(businessData);
			});
		});
	}

	setcontractTemplateVariab(data : any){
		this.contractTemplateVariableList = data.map((category: any) => {
			return new contractTemplateVariable().deserialize(category);
		});
		this.filterList = this.contractTemplateVariableList;
		// console.log(this.contractTemplateVariableList);
	}

	async onSubmit() {
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('contractHeaderTemplate/add', this.addForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.global.showToast('قالب قرار داد با نام  ' + this.addForm.value.name + ' ثبت شد .');
					this.navCtrl.navigateForward('/contracts/header/template/list');
					this.addForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	async ChangeBusinessCat(){
		const business_category_ids = this.addForm.value.business_categories;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('businessCategory/business/list', {
			business_category_ids
		}).subscribe(async (res:any) => {

			await this.global.dismisLoading();
			this.business = res.map((item : any)=>{
				return new BusinessList().deserialize(item);
			});

		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

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
