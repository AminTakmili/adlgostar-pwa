import { NavController } from '@ionic/angular';
import { error } from './../../../core/models/other.models';
import { formTemplate } from './../../../core/models/form-template.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from './../../../core/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-employee-form-add',
	templateUrl: './employee-form-add.component.html',
	styleUrls: ['./employee-form-add.component.scss'],
})
export class EmployeeFormAddComponent implements OnInit {
	businessEmployeeId: string;
	formTempeletList: formTemplate[];
	addForm: FormGroup;
	ckeConfig: CKEDITOR.config;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) {
		this.businessEmployeeId =
			route.snapshot.paramMap.get('businessEmployeeId');
		console.log(this.businessEmployeeId);
		this.addForm = this.fb.group({
			business_employee_id: [this.businessEmployeeId],
			form_date: [, Validators.required],
			form_template_id: [, Validators.required],
			form_text: [, Validators.required],
		});
		this.ckeConfig = {
			allowedContent: false,
			extraPlugins: 'divarea',
			forcePasteAsPlainText: true,
			removePlugins: 'exportpdf,font',
			language: 'fa',
			font_defaultLabel: 'IRANSans',
		};
	}

	ngOnInit() {}
	ionViewWillEnter() {
		this.getData();
	}
	async getData() {
		await this.global.showLoading();
		this.global
			.httpPost('formTemplate/filteredList', {
				limit: 9915,
				offset: 0,
				business_employee_id: this.businessEmployeeId,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					this.formTempeletList = res.list.map((item: any) => {
						return new formTemplate().deserialize(item);
					});
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}
	setTemplateText(event: any) {
		console.log(event);
		if (event?.template) {
			this.addForm.get('form_text').setValue(event.template);
		}
		if (!event) {
			this.addForm.get('form_text').setValue(null);
		}
	}
	async onSubmit() {
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading();
			console.log(this.addForm.get('business_employee_id').value);
			!this.addForm.get('business_employee_id').value
				? this.addForm
						.get('business_employee_id')
						.setValue(this.businessEmployeeId)
				: '';
			this.global
				.httpPost('businessEmployee/form/add', this.addForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						this.global.showToast(
							'فرم با موفقیت ثبت شد',
							850,
							'top',
							'success',
							'ios'
						);
						this.navCtrl.navigateForward(
							'/employees/detail/' + res.employee_id
						);
					},
					async (error: any) => {
						await this.global.dismisLoading();

						this.global.showError(error);
					}
				);
		}
	}
}
