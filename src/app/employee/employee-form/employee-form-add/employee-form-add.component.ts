import { NavController } from '@ionic/angular';
import { error } from './../../../core/models/other.models';
import { formTemplate, formTemplateType, formTemplateVariable } from './../../../core/models/form-template.model';
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
	templateForme: FormGroup;
	typeForm: FormGroup;
	ckeConfig: CKEDITOR.config;
	formTemplateTypeList: formTemplateType[];
	formTemplateVariableList: formTemplateVariable[];
	step:number=1
	sendObj:sendObj={
		business_employee_id:'',
		form_template_id:null,
		form_text:'',
		form_date:'',
		variable_values:[]
	}
	form_type_id:number|string
	typeNmae:string
	replaceText:string


	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) {
		this.businessEmployeeId =
			route.snapshot.paramMap.get('businessEmployeeId');
		console.log(this.businessEmployeeId);
		this.sendObj.business_employee_id=this.businessEmployeeId
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
		this.getFormType();
		
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

	async getFormType() {
		await this.global.showLoading();
		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		this.global.httpGet('formType/getFormType').subscribe(
			async (res: any) => {
				await this.global.dismisLoading();
				this.formTemplateTypeList = res.map(
					(type: formTemplateType) => {
						return new formTemplateType().deserialize(type);
					}
				);
				// this.getFormTemplateVariable();
				// console.log(this.formTemplateTypeList);
			},
			async (error: any) => {
				await this.global.dismisLoading();

				this.global.showError(error);
			}
		);
	}
	async getFormTemplateVariable() {
		await this.global.showLoading();
		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		this.global.httpPost('formType/getFormTemplateVariable',{form_type_id:this.form_type_id,from_form:1}).subscribe(
			async (res: any) => {
			await	this.global.dismisLoading();
				this.formTemplateVariableList = res.map(
					(type: formTemplateVariable) => {
						return new formTemplateVariable().deserialize(type);
					}
				);
				// this.getFormTemplateVariable();
				console.log(this.formTemplateVariableList);
				this.step=2
			},
			async (error: any) => {
			await	this.global.dismisLoading();

				this.global.showError(error);
			}
		);
	}
	async getFormTemplateList() {
		await this.global.showLoading();
		// const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });
		this.global.httpPost('formType/getFormTemplate',{form_type_id:this.form_type_id}).subscribe(
			async (res: any) => {
				await this.global.dismisLoading();
					this.formTempeletList = res.map((item: any) => {
						return new formTemplate().deserialize(item);
					});
				// this.getFormTemplateVariable();
				console.log(this.formTemplateVariableList);
				this.step=3
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
			this.sendObj.form_template_id=this.templateForme.get('form_template_id').value
			this.sendObj.form_date=this.templateForme.get('form_date').value
			this.sendObj.form_text=this.templateForme.get('form_text').value
			this.replaceData()

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
	async replaceData(){
		await this.global.showLoading()
		this.global.httpPost('businessEmployee/form/replaceVariableValuesInTemplate',this.sendObj).subscribe(
			async (res:any) => {
				await this.global.dismisLoading()
				console.log(res);
				this.step=4
				this.replaceText=res[0]?.template
			},
			async (error:any) => {
				await this.global.dismisLoading()
				this.global.showError(error)

				// console.log(error);
			}
		)
	}


	// 

	setFormeType(){
		this.typeForm.markAllAsTouched()
		if (this.typeForm.valid) {
			this.form_type_id=this.typeForm.value.form_type_id
			const	typeObj=this.formTemplateTypeList.find(x=>x.id==this.typeForm.value.form_type_id)
			this.typeNmae=typeObj.en_name
			console.log(this.typeNmae);
			if (this.typeNmae=='public') {
				//! shud write function for set tempelet n future
				// this.step=3
				this.getFormTemplateList()
			}else if (this.typeNmae=='loan_received'||this.typeNmae=='loan_installment'){
				this.step=2
				console.log("object");
			}else{
				this.getFormTemplateVariable()

			}
			
		}
		
	}
	setFormVrableValues(VrableValuesList:Array<object>){


		console.log("object",'/n',VrableValuesList);
		this.sendObj.variable_values=VrableValuesList
		this.getFormTemplateList()
		console.log(this.sendObj);
	}

	goPerSlide(){
		if (this.step!=0&&this.typeNmae!='public') {
			this.step--
		}
		if (this.typeNmae=='public'&&this.step==3) {
			this.step=1
		}
	}
	async submitforme(){

		console.log(this.sendObj);
		await this.global.showLoading()
		await this.global.httpPost('businessEmployee/form/add',this.sendObj).subscribe(
			async (res:any) => {
				console.log(res);
				await this.global.dismisLoading()
				await this.global.showToast(' فرم با وفقیت ثبت شد ' ,800,'top','success','ios')
				this.navCtrl.navigateBack('/employees/detail/'+res.employee_id)
			},
			async (error:any) => {
				await this.global.dismisLoading()

				this.global.showError(error)
				console.log(error);
			},
		)

	}
}
interface sendObj {
	business_employee_id:string|number,
	form_template_id:number,
	form_text:string,
	form_date:string,
	variable_values:Array<object>
}