import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CKEditorComponent } from 'ng2-ckeditor';
import { businessClass } from 'src/app/core/classes/business.class';
import { globalData } from 'src/app/core/data/global.data';
import { BusinessList } from 'src/app/core/models/business.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-contract-template-add',
  templateUrl: './contract-template-add.component.html',
  styleUrls: ['./contract-template-add.component.scss'],
})
export class ContractTemplateAddComponent implements OnInit {


	pageTitle: string = "افزودن قالب قرار داد جدید";

	addFrom: FormGroup;

	businessCatgeories: businessClass[] = [];

	conditionType = globalData.conditionType;
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
		this.addFrom = this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			template: ['', Validators.compose([Validators.required])],
			type: ['', Validators.compose([Validators.required])],
			business_categories: [[]],
			businesses: [[]],
			header_as_logo: [false],
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
		if (this.addFrom.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('contractTemplate/add', this.addFrom.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/contracts/template');
					this.global.showToast('قالب قرار داد با نام  ' + this.addFrom.value.name + ' ثبت شد .');
					this.addFrom.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	async ChangeBusinessCat(){
		const business_category_ids = this.addFrom.value.business_categories;
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


}
