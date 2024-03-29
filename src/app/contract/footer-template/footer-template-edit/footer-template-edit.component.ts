import { ActivatedRoute } from '@angular/router';
import { contractFooterTemplateDetail } from './../../../core/models/contractConstant.model';
import { ClipboardService } from 'ngx-clipboard';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { contractTemplateVariable } from 'src/app/core/models/contractConstant.model';
import { BusinessList } from 'src/app/core/models/business.model';
import { CKEditorComponent } from 'ng2-ckeditor';
import { globalData } from 'src/app/core/data/global.data';
import { businessClass } from 'src/app/core/classes/business.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer-template-edit',
  templateUrl: './footer-template-edit.component.html',
  styleUrls: ['./footer-template-edit.component.scss'],
})
export class FooterTemplateEditComponent implements OnInit {

  id:string|number

	pageTitle: string = "ویرایش قالب پاورقی ";

	editForm: FormGroup;

	businessCatgeories: businessClass[] = [];

	conditionType = globalData.conditionType;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;

	business : BusinessList[] = [];
	contractTemplateVariableList : contractTemplateVariable[];
	setcontractFooterTemplateDetailObj : contractFooterTemplateDetail;
	filterList : contractTemplateVariable[];

	// public Editor = ClassicEditor;
	editors = ['Classic', 'Inline'];

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private clipboardApi: ClipboardService,
		private rout: ActivatedRoute,
	) {
		//
		this.editForm = this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			template: ['', Validators.compose([Validators.required])],
			id: ['', Validators.compose([Validators.required])],
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
			removePlugins: 'exportpdf,font',
			language: "fa",
			font_defaultLabel: 'IRANSans'
		};
    this.id=rout.snapshot.paramMap.get('id')
    
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
		const contractTemplateVariable = this.global.httpGet('salaryBaseInfo/contractFooterTemplateVariableList');
		const contractFooterTemplateDetail = this.global.httpPost('contractFooterTemplate/detail',{id:this.id});
		this.global.parallelRequest([businessCategory , contractTemplateVariable,contractFooterTemplateDetail])
			.subscribe(([businessCategory , contractTemplateVariableRes = '',contractFooterTemplateDetailRes='' ]) => {
				this.setBussinessCategory(businessCategory);
				this.setcontractTemplateVariab(contractTemplateVariableRes);
				this.setcontractFooterTemplateDetail(contractFooterTemplateDetailRes);
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

	setcontractFooterTemplateDetail(data : any){
		this.setcontractFooterTemplateDetailObj = new contractFooterTemplateDetail().deserialize(data);
    this.editForm.get('name').setValue(this.setcontractFooterTemplateDetailObj.name);
    this.editForm.get('template').setValue(this.setcontractFooterTemplateDetailObj.template  );
    this.editForm.get('id').setValue(this.id  );

    // this.contractFooterTemplateInfoListGroup.controls[0].get('contract_footer_template_id').setValue(this.dataList['contract_footer_template_info'][0]?.id);
    // this.contractFooterTemplateInfoListGroup.controls[0].get('footer_text').setValue(this.dataList['contract_footer_template_info'][0]?.template);
	}

	async onSubmit() {
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {

			if (this.setcontractFooterTemplateDetailObj.used_in_contract) {
				this.global.showAlert(' ویرایش پاورقی استفاده شده ! ',
				'این قالب پاورقی در قرارداد های قبلی استفاده شده است و با ویرایش فقط قرارداد های آتی تغییر میکند.',
				[
					{
						text: 'انصراف',
						role: 'cancel'
					},
					{
						text: ' ویرایش',
						role: 'yes'
					}
				]).then((alert) => {
					alert.present();
					alert.onDidDismiss().then(async (e: any) => {
						if (e.role === 'yes') {
							this.sendForm()
						}
					});
				});
			}else{
				this.sendForm()
			}



		}
	}
	async sendForm(){
		
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPatch('contractFooterTemplate/edit', this.editForm.value)
			.subscribe(async (res:any) => {

				await this.global.dismisLoading();
				// console.log(res:any);
				this.global.showToast('قالب قرارداد با نام  ' + this.editForm.value.name + ' ویرایش شد .');
				this.navCtrl.navigateForward('/contracts/footer/template/list');
				this.editForm.reset();
			}, async (error:any) => {
				await this.global.dismisLoading();
				this.global.showError(error);
			});

	}
	async ChangeBusinessCat(){
		const business_category_ids = this.editForm.value.business_categories;
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
