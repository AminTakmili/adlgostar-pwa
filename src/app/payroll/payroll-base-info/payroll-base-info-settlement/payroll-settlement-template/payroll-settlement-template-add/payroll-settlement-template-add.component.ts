import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BusinessList } from 'src/app/core/models/business.model';
import { CKEditorComponent } from 'ng2-ckeditor';
import { DataSets } from './../../../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';
import { businessClass } from 'src/app/core/classes/business.class';
import { globalData } from 'src/app/core/data/global.data';

@Component({
  selector: 'app-payroll-settlement-template-add',
  templateUrl: './payroll-settlement-template-add.component.html',
  styleUrls: ['./payroll-settlement-template-add.component.scss'],
})
export class PayrollSettlementTemplateAddComponent implements OnInit {
  pageTitle: string = "افزودن قالب تسویه حساب جدید";

	addForm: FormGroup;

	businessCatgeories: businessClass[] = [];

  settlement_type:DataSets[]
  ;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;

	business : BusinessList[] = [];
	// public Editor = ClassicEditor;
	editors = ['Classic', 'Inline'];

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		//
		this.addForm = this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			template: ['', Validators.compose([Validators.required])],
			type: [, Validators.compose([Validators.required])],
		
			businesses: [[]],
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

async	ngOnInit() {
		this.setTitle();
		this.getData();
    await this.global.baseData.subscribe((value) => {
			if (value) {
				this.settlement_type = value.settlement_type;
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

	getData() {

		const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });


		this.global.parallelRequest([businessCategory])
			.subscribe(([businessCategory]) => {
				this.setBussinessCategory(businessCategory);
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

	async onSubmit() {
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('settlementTemplate/add', this.addForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/payrolls/payroll_base_info/settlement/template/list');
          this.global.showToast('قالب  تسویه حساب  با نام '+ this.addForm.value.name +' ثبت شد .',1000,'top','success','ios');

					this.addForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}


}
