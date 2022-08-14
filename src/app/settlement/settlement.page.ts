import * as _ from 'lodash';

// import { sentenceTemplate } from './../../core/models/sentence.model';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, NavController } from '@ionic/angular';
import { Observable, Subject, concat, of, throwError } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	tap,
} from 'rxjs/operators';
import { contractConditions, contractTemplate } from 'src/app/core/models/contractConstant.model';
import { contractFooterTemplate, contractHeaderTemplate } from './../core/models/contractConstant.model';

import { BusinessList } from 'src/app/core/models/business.model';
import { CKEditorComponent } from 'ng2-ckeditor';
import { Employee } from 'src/app/core/models/employee.model';
import { Employer } from 'src/app/core/models/employer.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { async } from '@angular/core/testing';
import { businessEmployeeInfo } from './../core/models/employee.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { format } from 'date-fns-jalali'
import { severanceBaseCalculation } from 'src/app/core/models/severanceBaseCalculation.model';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.page.html',
  styleUrls: ['./settlement.page.scss'],
})
export class SettlementPage implements OnInit {

	@ViewChildren('validation') validation: QueryList<any>;
	pageTitle: string = "افزودن قرار داد";
	contractsForm: FormGroup;
	step: number = 1;
	// public Editor = ClassicEditor;

	editors = ['Classic', 'Inline'];

	@ViewChild("popoverDatetime2", { static: true }) datetime: IonDatetime;

	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D'
	}
	submitet: boolean = false;
	
	provisosList: FormArray;
	extraFieldsList: FormArray;
	childrenAllowancesList: FormArray;
	contractHeaderTemplateInfoList: FormArray;
	contractFooterTemplateInfoList: FormArray;



	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {



		this.contractsForm = this.fb.group({
			title: ['', Validators.compose([Validators.required])],
			business_id: [, Validators.compose([Validators.required])],
			contract_condition_id: [''],
			employee_ids: [[], Validators.compose([Validators.required])],
			employer_ids: [[], Validators.compose([Validators.required])],
			business_employee_ids: [[], Validators.compose([Validators.required])],
			contract_template_id: ['', Validators.compose([Validators.required])],
			main_text: ['', Validators.compose([Validators.required])],
			end_text: [''],
			// employee_start_date: ['', Validators.compose([Validators.required])],
			start_date: ['', Validators.compose([Validators.required])],
			end_date: ['', Validators.compose([Validators.required])],
			contract_year: ['', Validators.compose([Validators.required])],
			wage: [0, Validators.compose([Validators.required])],
			severance_pay: [0, Validators.compose([Validators.required])],
			grocery_allowance: [0, Validators.compose([Validators.required])],
			housing_allowance: [0, Validators.compose([Validators.required])],
			new_year_gift: [0, Validators.compose([Validators.required])],
			bonus: [0, Validators.compose([Validators.required])],
			food_cost: [0, Validators.compose([Validators.required])],
			pension_cost: [0, Validators.compose([Validators.required])],
			calc_payroll_tax: ['all_working_days', Validators.compose([Validators.required])],
			calc_unused_leave_monthly: [0, Validators.compose([Validators.required])],
			calc_severance_base: [true],
			calc_severance_pay_monthly: [true],
			calc_bonus_monthly: [true],
			calc_new_year_gift_monthly: [true],
			is_contract_for_future: [false],
			is_hourly_contract: [false],
			is_manual: [false],

			children_allowances: this.fb.array([]),
			provisos: this.fb.array([]),
			extra_fields: this.fb.array([]),
			contract_header_template_info: this.fb.array([this.newContractHeaderTemplateInfoList()]),
			contract_footer_template_info: this.fb.array([this.newContractFooterTemplateInfoList()]),

		});

		this.provisosList = this.contractsForm.get('provisos') as FormArray;
		this.extraFieldsList = this.contractsForm.get('extra_fields') as FormArray;
		this.childrenAllowancesList = this.contractsForm.get('children_allowances') as FormArray;
		this.contractHeaderTemplateInfoList = this.contractsForm.get('contract_header_template_info') as FormArray;
		this.contractFooterTemplateInfoList = this.contractsForm.get('contract_footer_template_info') as FormArray;


	}

	ngOnInit() {
		this.setTitle();
	
	}

	ionViewWillEnter() {

	}

	setTitle() {
		this.seo.generateTags({
			title: 'افزودن قرار داد جدید',
			description: 'قرار داد جدی ',
			keywords: "قرار داد جدی",
			isNoIndex: false,
		});
	}

	/* ============================== All form arrays ===========================================*/
	get contractHeaderTemplateInfoListGroup(): FormArray {
		return this.contractsForm.get('contract_header_template_info') as FormArray;
	}
	get contractFooterTemplateInfoListGroup(): FormArray {
		return this.contractsForm.get('contract_footer_template_info') as FormArray;
	}

	newContractHeaderTemplateInfoList(): FormGroup {
		return this.fb.group({
			contract_header_template_id: [],
			header_text: [],
		})
	}
	newContractFooterTemplateInfoList(): FormGroup {
		return this.fb.group({
			contract_footer_template_id: [],
			footer_text: [],
		})
	}

	provisos(id: number, text = ''): FormGroup {
		return this.fb.group({
			contract_proviso_template_id: [id, Validators.compose([Validators.required])],
			proviso_text: [text, Validators.compose([Validators.required])],
		});
	}
	get provisosFormGroup(): FormArray {
		return this.contractsForm.get('provisos') as FormArray;
	}

	extraFields(id: number): FormGroup {
		return this.fb.group({
			contract_extra_field_id: [id, Validators.compose([Validators.required])],
			price: [0, Validators.compose([Validators.required])],
		});
	}

	get extraFieldsFormGroup(): FormArray {
		return this.contractsForm.get('extra_fields') as FormArray;
	}

	childrenAllowance(business_employee_id: number , employee_id : number): FormGroup {
		return this.fb.group({
			business_employee_id: [business_employee_id, Validators.compose([Validators.required])],
			employee_id: [employee_id, Validators.compose([Validators.required])],
			children_allowance: [0, Validators.compose([Validators.required])],
		});
	}

	get childrenAllowanceFormGroup(): FormArray {
		return this.contractsForm.get('children_allowances') as FormArray;
	}

	/* ============================== end All form arrays ===========================================*/





	RemoveCondition(event: any) {
		this.provisosFormGroup.controls.splice(event.index, 1);
	}
	

	formatDate(value: string) {
		// console.log(this.datetime.dayValues);
		return format(new Date(value), 'yyyy-MM-dd');
	}

	async CalculationField() {

		if (!this.submitet) {

			if (this.contractsForm.value.contract_year === '') {
				this.global.showToast('سال عقد قرار داد را انتخاب کنید')
				return;
			}

			if (!this.contractsForm.get('is_manual').value) {
				this.submitet = true;
				await this.global.showLoading('لطفا منتظر بمانید...');
				this.global.httpPost('contract/calculatePrices', this.contractsForm.value).
					subscribe(async (res: any) => {
						this.submitet = false;
						await this.global.dismisLoading();

						this.contractsForm.get('bonus').setValue(res.bonus);
						this.contractsForm.get('grocery_allowance').setValue(res.grocery_allowance);
						this.contractsForm.get('housing_allowance').setValue(res.housing_allowance);
						this.contractsForm.get('new_year_gift').setValue(res.new_year_gift);
						this.contractsForm.get('severance_pay').setValue(res.severance_pay);
						this.contractsForm.get('wage').setValue(res.wage);

						// console.log(res);

					}, async (error: any) => {
						this.submitet = false;
						await this.global.dismisLoading();
						this.global.showError(error);
					});
			}
		}
	}

	
	calcChildrenAllowance() {
		if (this.contractsForm.value.contract_year !== '' && this.contractsForm.value.business_employee_ids.length) {
			// console.log('calcChildrenAllowance');
			this.global.httpPost('contract/calculateChildrenAllowance', {
				contract_year : this.contractsForm.value.contract_year,
				is_hourly_contract : this.contractsForm.value.is_hourly_contract,
				employee_ids : this.contractsForm.value.employee_ids
			}).subscribe(async (res: any) => {

				this.childrenAllowanceFormGroup.controls.map((item:any)=>{
					const  allowance = res.find((x:any) => x.employee_id === item.value.employee_id).children_allowance ;
					item.get('children_allowance').setValue(allowance);
				});

				}, async (error: any) => {
					this.global.showError(error);
				});
		} else {
			// console.log('no-calcChildrenAllowance')
		}
	}

	async onSubmit() {
		// console.log('submit form');
		this.contractsForm.markAllAsTouched();
		// console.log(this.contractsForm)
		if (this.contractsForm.valid) {
			this.submitet = true;
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('contract/add', this.contractsForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					this.navCtrl.navigateForward('/contracts/list');
					this.global.showToast(' قرار داد با نام  ' + this.contractsForm.value.title + ' ثبت شد .');
					this.contractsForm.reset();

				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
					this.submitet = false;
				});
		} else {

			let errors: string[] = [];
			setTimeout(() => {
				this.validation.forEach((elem: any) => {
					if (elem.text) {
						errors.push('<li class="font-size-14 color-danger">' + elem.text.el.innerText + '</li>');
					}
				});
				this.global.showAlert(
					'خطا',
					'<ul class="px-4 my-0">' + errors.join('') + '</ul>',
					[{
						text: 'متوجه شدم',
						role: 'yes'
					}],
					'ابتدا موارد زیر را بررسی و سپس فرم را ثبت کنید'
				).then((alert: any) => {
					alert.present();
				});
			}, 100);

		}
	}


}
