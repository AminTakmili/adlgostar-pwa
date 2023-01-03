import { async } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import {
	formTemplate,
	formTemplateType,
	formTemplateVariable,
} from './../../../core/models/form-template.model';
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
	templateForme: FormGroup;
	typeForm: FormGroup;
	ckeConfig: CKEDITOR.config;
	formTemplateTypeList: formTemplateType[];
	formTemplateVariableList: formTemplateVariable[];
	step: number = 1;
	sendObj: sendObj = {
		id:'',
		business_employee_id: '',
		form_template_id: null,
		form_text: '',
		form_date: '',
		variable_values: [],
	};
	form_type_id: number | string;
	typeNmae: string;
	replaceText: string;
	defaltData:any
	isFirstTime=true;
	detailsList:any[]
	showText=false
	business_employee_form_id:number
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) {
		this.businessEmployeeId =
			route.snapshot.paramMap.get('businessEmployeeId');
		this.id = route.snapshot.paramMap.get('id');
		console.log(this.businessEmployeeId);
		this.sendObj.business_employee_id = this.businessEmployeeId;
		this.sendObj.id = this.id;
		this.typeForm = this.fb.group({
			form_type_id: [1, Validators.required],
		});
		this.templateForme = this.fb.group({
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
		// *
		// this.getData();
		this.getFormTypeAndDefaltValue();
	}
	// async getData() {
	// 	await this.global.showLoading();
	// 	this.global
	// 		.httpPost('formTemplate/filteredList', {
	// 			limit: 9915,
	// 			offset: 0,
	// 			business_employee_id: this.businessEmployeeId,
	// 		})
	// 		.subscribe(
	// 			async (res: any) => {
	// 				await this.global.dismisLoading();
	// 				this.formTempeletList = res.list.map((item: any) => {
	// 					return new formTemplate().deserialize(item);
	// 				});
	// 			},
	// 			async (error: any) => {
	// 				await this.global.dismisLoading();
	// 				this.global.showError(error);
	// 			}
	// 		);
	// }

	setFormType(data: any) {
		this.formTemplateTypeList = data.map((type: formTemplateType) => {
			return new formTemplateType().deserialize(type);
		});
	}
	async getFormTypeAndDefaltValue() {
		await this.global.showLoading();
		const detailReq = this.global.httpPost('businessEmployee/form/detail', {
			id: this.id,
		});
		const formTypeReq = this.global.httpGet('formType/getFormType');
		this.global
			.parallelRequest([detailReq, formTypeReq])
			.subscribe(async ([detailRes, formTypeRes = '']) => {
				await this.global.dismisLoading();
				this.setFormType(formTypeRes);
				this.setData(detailRes,formTypeRes);
			});
	}
	async getFormTemplateVariable() {
			console.log('getFormTemplateVariable');
			await this.global.showLoading();
			// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
			this.global
				.httpPost('formType/getFormTemplateVariable', {
					form_type_id: this.form_type_id,
					from_form: 1,
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						this.formTemplateVariableList = res.map(
							(type: formTemplateVariable) => {
								return new formTemplateVariable().deserialize(type);
							}
						);
						// this.getFormTemplateVariable();
						console.log(this.formTemplateVariableList);
						this.step = 2;
					},
					async (error: any) => {
						await this.global.dismisLoading();
	
						this.global.showError(error);
					}
				);
		
	}
	async getFormTemplateList() {
		await this.global.showLoading();
		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		this.global
			.httpPost('formType/getFormTemplate', {
				form_type_id: this.form_type_id,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					this.formTempeletList = res.map((item: any) => {
						return new formTemplate().deserialize(item);
					});
					// this.getFormTemplateVariable();
					console.log(this.formTemplateVariableList);
					this.step = 3;
					setTimeout(() => {				
						this.showText=true
					}, 100);
				},
				async (error: any) => {
					this.global.dismisLoading();

					this.global.showError(error);
				}
			);
	}

	setTemplateText(event: any) {
		console.log(event);
		if (event?.template) {
			this.templateForme.get('form_text').setValue(event.template);
		}
		if (!event) {
			this.templateForme.get('form_text').setValue(null);
		}
	}
	async setTemplate() {
		this.templateForme.markAllAsTouched();
		if (this.templateForme.valid) {
			this.sendObj.form_template_id =
				this.templateForme.get('form_template_id').value;
			this.sendObj.form_date = this.templateForme.get('form_date').value;
			this.sendObj.form_text = this.templateForme.get('form_text').value;
			this.replaceData();

			// await this.global.showLoading();
			// console.log(this.templateForme.get('business_employee_id').value);
			// !this.templateForme.get('business_employee_id').value
			// 	? this.templateForme
			// 			.get('business_employee_id')
			// 			.setValue(this.businessEmployeeId)
			// 	: '';
			// this.global
			// 	.httpPost('businessEmployee/form/add', this.templateForme.value)
			// 	.subscribe(
			// 		async (res: any) => {
			// 			await this.global.dismisLoading();
			// 			this.global.showToast(
			// 				'فرم با موفقیت ثبت شد',
			// 				850,
			// 				'top',
			// 				'success',
			// 				'ios'
			// 			);
			// 			this.navCtrl.navigateForward(
			// 				'/employees/detail/' + res.employee_id
			// 			);
			// 		},
			// 		async (error: any) => {
			// 			await this.global.dismisLoading();

			// 			this.global.showError(error);
			// 		}
			// 	);
		}
	}
	async replaceData() {
		await this.global.showLoading();
		if (!this.sendObj.variable_values) {
			this.sendObj.variable_values=[]
		}
		this.global
			.httpPost(
				'businessEmployee/form/replaceVariableValuesInTemplate',
				this.sendObj
			)
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(res);
					this.step = 4;
					this.replaceText = res[0]?.template;
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);

					// console.log(error);
				}
			);
	}

	//

	setFormeType() {
		this.typeForm.markAllAsTouched();
		// console.log(this.isFirstTime);
		// console.log(',,: ',this.defaltData.form_type_id , this.form_type_id,this.typeForm.value.form_type_id,this.isFirstTime);
		// console.log('if: ',((this.defaltData.form_type_id!=this.typeForm.value.form_type_id))&&!this.isFirstTime);
		// console.log('emadif',( !( this.typeForm.value.form_type_id==this.defaltData.form_type_id&&this.isFirstTime) ) );
		// console.log('emadifCHEC',this.defaltData.form_type_id, this.typeForm.value.form_type_id,this.isFirstTime );
		// console.log('	this.typeNmae',	this.typeNmae);
		// console.log("///////////////",this.formTemplateVariableList);
		if (this.typeForm.valid) {
			this.form_type_id = this.typeForm.value.form_type_id;
			const typeObj = this.formTemplateTypeList.find(
				(x) => x.id == this.typeForm.value.form_type_id
			);
			this.typeNmae = typeObj.en_name;
			console.log(this.typeNmae);
			if ( !( this.typeForm.value.form_type_id==this.defaltData.form_type_id&&this.isFirstTime) ) {
				this.templateForme.reset()
			this.detailsList=[]

			if (this.typeNmae == 'public') {
				//! shud write function for set tempelet n future
				// this.step=3
				this.getFormTemplateList();
			} else if (
				this.typeNmae == 'loan_received' ||
				this.typeNmae == 'loan_installment'
			) {
				this.step = 2;
				console.log('object');
			} else {
				this.getFormTemplateVariable();
			}
		}else{
			this.isFirstTime=false
			if (this.typeNmae == 'public') {
				this.getFormTemplateList();

			}else{

				this.step = 2;
			}
		
		}
		}
	}
	setFormVrableValues(VrableValuesList: Array<object>) {
		console.log('object', '/n', VrableValuesList);
		this.sendObj.variable_values = VrableValuesList;
		this.getFormTemplateList();
		console.log(this.sendObj);
	}

	goPerSlide() {
		if (this.step != 0 && this.typeNmae != 'public') {
			this.step--;
		}
		if (this.typeNmae == 'public' && this.step == 3) {
			this.step = 1;
		}
	}
	async submitforme() {
		console.log(this.sendObj);
		if (!this.sendObj.variable_values) {
			this.sendObj.variable_values=[]
		}
		await this.global.showLoading();
		await this.global
			.httpPatch('businessEmployee/form/edit', this.sendObj)
			.subscribe(
				async (res: any) => {
					console.log(res);
					await this.global.dismisLoading();
					await this.global.showToast(
						' فرم با وفقیت ویرایش شد ',
						800,
						'top',
						'success',
						'ios'
					);
					this.navCtrl.navigateBack(
						'/employees/detail/' + res.employee_id
					);
				},
				async (error: any) => {
					await this.global.dismisLoading();

					this.global.showError(error);
					console.log(error);
				}
			);
	}
	async setData(data: any,formTypeRes:any) {
	const o=	{
			"id": 9,
			"business_employee_id": 2,
			"form_type_id": 3,
			"form_template_id": 7,
			"form_text": "<p>تاریخ وام :&nbsp;</p>\n\n<p>{date}</p>\n\n<p>وام دریافتی:</p>\n\n<p>{amount}</p>\n\n<p>{employee_first_name}&nbsp;{employee_last_name}</p>",
			"form_date": "1401-10-04",
			"variable_info": [
				{
					"id": 21,
					"variable": "{date}",
					"description": "تاریخ دریافت وام",
					"input_type": "date",
					"value": "1401/10/04"
				},
				{
					"id": 22,
					"variable": "{amount}",
					"description": "وام دریافتی",
					"input_type": "number",
					"value": 5500000
				}
			],
			"loan_received_details": [
				{
					"year": 1401,
					"month": 11,
					"installment_num": 1,
					"installment_amount": 1
				},
				{
					"year": 1401,
					"month": 12,
					"installment_num": 2,
					"installment_amount": 5499999
				}
			],
			"business_info": {
				"id": 3,
				"name": "شرکت رادمان پخش"
			},
			"employee_info": {
				"id": 2,
				"first_name": "سحر",
				"last_name": "نیکنام",
				"national_code": "2300274191",
				"mobile": "09171885031"
			},
			"createdAt": "1401/10/04 - 17:41",
			"createdAtEn": "2022-12-25T17:41:18+03:30",
			"updatedAt": "1401/10/04 - 17:41",
			"updatedAtEn": "2022-12-25T17:41:18+03:30"
		}
		console.log(data);
		console.log(formTypeRes);
		this.defaltData=data
		this.sendObj.business_employee_id=data.business_employee_id
		this.sendObj.form_date=data.form_date
		this.sendObj.form_template_id=data.form_template_id
		this.sendObj.form_text=data.form_text
		this.sendObj.variable_values=data.variable_values
		this.templateForme.get('form_date').setValue(data.form_date)
		this.templateForme.get('form_template_id').setValue(data.form_template_id)
		this.templateForme.get('form_text').setValue(data.form_text)
		this.typeForm.get('form_type_id').setValue(data.form_type_id)
		this.form_type_id=data.form_type_id
		this.formTemplateVariableList = data.variable_info&&data.variable_info.length? data.variable_info.map(
			(type: formTemplateVariable) => {
				return new formTemplateVariable().deserialize(type);
			}
		):[];
		this.detailsList=data.loan_received_details
		this.business_employee_form_id=data.business_employee_form_id
		// this.form_type_id = this.typeForm.value.form_type_id;
		// const typeObj = formTypeRes.find(
		// 	(x:any) => x.id == this.typeForm.value.form_type_id
		// );
		// this.typeNmae = typeObj.en_name;
	}
}
interface sendObj {
	business_employee_id: string | number;
	id: string | number;
	form_template_id: number;
	form_text: string;
	form_date: string;
	variable_values: Array<object>;
}
