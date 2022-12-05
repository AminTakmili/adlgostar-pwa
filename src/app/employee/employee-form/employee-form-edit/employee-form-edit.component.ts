import { NavController } from '@ionic/angular';
import { error } from './../../../core/models/other.models';
import { formTemplate } from './../../../core/models/form-template.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from './../../../core/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-form-edit',
  templateUrl: './employee-form-edit.component.html',
  styleUrls: ['./employee-form-edit.component.scss'],
})
export class EmployeeFormEditComponent implements OnInit {

	businessEmployeeId: string;
	id: string;
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
		this.id =
			route.snapshot.paramMap.get('id');
		console.log(this.businessEmployeeId);
		this.addForm = this.fb.group({
			business_employee_id: [this.businessEmployeeId],
			id: [this.id],
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
		this.setData();
	}
	async getData() {
		// await this.global.showLoading();
		this.global
			.httpPost('formTemplate/filteredList', {
				limit: 9915,
				offset: 0,
				business_employee_id: this.businessEmployeeId,
			})
			.subscribe(
				async (res: any) => {
					// await this.global.dismisLoading();
					this.formTempeletList = res.list.map((item: any) => {
						return new formTemplate().deserialize(item);
					});
				},
				async (error: any) => {
					// await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}
	async setData() {
		await this.global.showLoading();
		this.global
			.httpPost('businessEmployee/form/detail', {
				id:this.id
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
          console.log(res);
				this.addForm.patchValue(res)
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
			!this.addForm.get('id').value
				? this.addForm
						.get('id')
						.setValue(this.id)
				: '';
			this.global
				.httpPatch('businessEmployee/form/edit', this.addForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						this.global.showToast(
							'فرم با موفقیت ویرایش شد',
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
