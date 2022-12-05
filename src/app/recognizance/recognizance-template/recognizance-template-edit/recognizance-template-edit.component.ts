import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-recognizance-template-edit',
  templateUrl: './recognizance-template-edit.component.html',
  styleUrls: ['./recognizance-template-edit.component.scss'],
})
export class RecognizanceTemplateEditComponent implements OnInit {


	pageTitle: string = "ویرایش قالب تعهدنامه ";

	editForm: FormGroup;

	businessCatgeories: businessClass[] = [];

	conditionType = globalData.conditionType;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;

	business : BusinessList[] = [];
	recognizanceTemplateVariableList : contractTemplateVariable[];
	filterList : contractTemplateVariable[];

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

	getData() {

		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		const contractTemplateVariable = this.global.httpGet('recognizanceTemplate/variableList');
		const recognizanceTemplateDetail = this.global.httpPost('recognizanceTemplate/detail',{id:this.id});
		this.global.parallelRequest([  contractTemplateVariable,recognizanceTemplateDetail])
			.subscribe(([  contractTemplateVariableRes = '', recognizanceTemplateDetailRes = '' ]) => {
				// this.setBussinessCategory(businessCategory);
				this.setcontractTemplateVariab(contractTemplateVariableRes);
        this.setdetail(recognizanceTemplateDetailRes)
			});
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

	setcontractTemplateVariab(data : any){
		this.recognizanceTemplateVariableList = data.map((category: any) => {
			return new contractTemplateVariable().deserialize(category);
		});
		this.filterList = this.recognizanceTemplateVariableList;
		// console.log(this.recognizanceTemplateVariableList);
	}

	async onSubmit() {
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('recognizanceTemplate/edit', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/recognizance/template');
					this.global.showToast('قالب تعهدنامه با نام  ' + this.editForm.value.name + ' ویرایش شد .');
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
			this.filterList = this.global.filterItems(this.recognizanceTemplateVariableList, event.detail.value);
		}else{
			this.filterList = this.recognizanceTemplateVariableList;
		}
	}


}
