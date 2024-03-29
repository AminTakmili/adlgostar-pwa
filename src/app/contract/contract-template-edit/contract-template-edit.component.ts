import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ClipboardService } from 'ngx-clipboard';
import { businessClass } from 'src/app/core/classes/business.class';
import { globalData } from 'src/app/core/data/global.data';
import { BusinessList } from 'src/app/core/models/business.model';
import { contractConditions, contractTemplate, contractTemplateVariable } from 'src/app/core/models/contractConstant.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-contract-template-edit',
  templateUrl: './contract-template-edit.component.html',
  styleUrls: ['./contract-template-edit.component.scss'],
})
export class ContractTemplateEditComponent implements OnInit {

	pageTitle: string = "افزودن شروط ضمن قرارداد جدید";
	editForm: FormGroup;
	businessCatgeories: businessClass[] = [];

	conditionType = globalData.conditionType;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;
	// public Editor = ClassicEditor;
	editors = ['Classic', 'Inline'];
	dataList : contractTemplate ;
	contractTemplateVariableList : contractTemplateVariable[];
	filterList : contractTemplateVariable[];

	business : BusinessList[] = [];

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private clipboardApi: ClipboardService
	) {
		//
		this.editForm = this.fb.group({
			id: [''],
			name: ['', Validators.compose([Validators.required])],
			template: ['', Validators.compose([Validators.required])],
			type: ['', Validators.compose([Validators.required])],
			business_categories: [[]],
			businesses: [[]],
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

	}
	async ionViewWillEnter() {
		this.getData();
		this.getData2(this.route.snapshot.paramMap.get('id'));
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}


	async getData2(id: string){
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contractTemplate/detail', {
			id: id,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new contractTemplate().deserialize(res);
			console.log(this.dataList);
			this.editForm = this.fb.group({
				id: [this.dataList.id],
				name: [this.dataList.name ,  Validators.compose([Validators.required])],
				template: [this.dataList.template, Validators.compose([Validators.required])],
				type: [this.dataList.type, Validators.compose([Validators.required])],
				business_categories: [this.dataList.business_categories ],
				businesses: [this.dataList.businesses],
				header_as_logo: [this.dataList.header_as_logo],
			});
			if(this.dataList.business_categories && this.dataList.business_categories.length){
				this.GetBusinessData(this.dataList.business_categories);
			}

			console.log(this.editForm.value);

			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}
	getData() {

		const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		const contractTemplateVariable = this.global.httpGet('salaryBaseInfo/contractTemplateVariableList');
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
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('contractTemplate/edit', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/contracts/template');
					this.global.showToast(' قالب قرارداد با نام  ' + this.editForm.value.name + ' ویرایش شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	 ChangeBusinessCat(){
		const id = this.editForm.value.business_categories;
		this.GetBusinessData(id)
	}

	async GetBusinessData(business_category_ids : number[]){
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
