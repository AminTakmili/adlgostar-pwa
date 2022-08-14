import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CKEditorComponent } from 'ng2-ckeditor';
import { DataSets } from './../../../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-payroll-settlement-template-edit',
	templateUrl: './payroll-settlement-template-edit.component.html',
	styleUrls: ['./payroll-settlement-template-edit.component.scss'],
})
export class PayrollSettlementTemplateEditComponent implements OnInit {
	pageTitle: string = 'ویرایش قالب تسویه حساب';
	editForm: FormGroup;


	id: string;
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;
  settlement_type:DataSets[]

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute
	) { 
     this.ckeConfig = {
    allowedContent: false,
    extraPlugins: 'divarea',
    forcePasteAsPlainText: true,
    removePlugins: 'exportpdf,font',
    language: "fa",
    font_defaultLabel: 'IRANSans'
  };
		this.id = route.snapshot.paramMap.get('id');

		this.editForm = this.fb.group({
			id: [this.id],
			name: ['', Validators.compose([Validators.required])],
			template: ['', Validators.compose([Validators.required])],
			type: [, Validators.compose([Validators.required])],
		
		});
	}

	async ngOnInit() {
		this.setTitle();
	  await this.global.baseData.subscribe((value) => {
			if (value) {
				this.settlement_type = value.settlement_type;
			}
		});
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
		await this.global.showLoading();
		this.global
			.httpPost('settlementTemplate/detail', { id: this.id })
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
				
					this.editForm.get('type').setValue(res.type);
					this.editForm.get('template').setValue(res.template);
					this.editForm.get('name').setValue(res.name);
				},
				async (error: any) => {
					console.log(error);
					await this.global.dismisLoading();
				}
			);
	}

	async onSubmit() {
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPatch('settlementTemplate/edit', this.editForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);

						this.navCtrl.navigateForward(
							'/payrolls/payroll_base_info/settlement/template/list'
						);
						this.global.showToast(
							'قالب تسویه حساب ویرایش شد',
							1000,
							'top',
							'success',
							'ios'
						);

						this.editForm.reset();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}
}
