import { DataSets } from 'src/app/core/models/StaticData.model';
import {
	payrollDeduction,
	payrollAddition,
} from './../../core/models/settlement.model';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

// import { sentenceTemplate } from './../../core/models/sentence.model';
import {
	Component,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
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

import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { async } from '@angular/core/testing';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { format } from 'date-fns-jalali';
import { severanceBaseCalculation } from 'src/app/core/models/severanceBaseCalculation.model';
import { settlementTemplate } from 'src/app/core/models/settlement.model';

@Component({
  selector: 'app-settlement-edit',
  templateUrl: './settlement-edit.component.html',
  styleUrls: ['./settlement-edit.component.scss'],
})
export class SettlementEditComponent implements OnInit {
  pageTitle: string = 'افزودن تسویه حساب ';
	contractsForm: FormGroup;
	step: number = 1;
	// public Editor = ClassicEditor;

	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D',
	};

	settlement_additions: FormArray;
	settlement_deductions: FormArray;

	settlementTemplateList: settlementTemplate[];
	settlementTemplateText: string;
	settlementId: string;
	settlementAdditionList: payrollAddition[];
	settlementDeductionList: payrollDeduction[];
	settlementCalcType!:DataSets[]
  businessEmployeeId!:string

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private rout: ActivatedRoute
	) {

		this.settlementId = rout.snapshot.paramMap.get('settlementId');
		
		this.contractsForm = this.fb.group({
		id: [this.settlementId],
		business_employee_id:[],

			settlement_template_id: [
				,
				Validators.compose([Validators.required]),
			],
			leave_work_date: [, Validators.compose([Validators.required])],
			new_year_gift_calc_type: [
				'all_working_days',
				Validators.compose([Validators.required]),
			],
			bonus_calc_type: [
				'all_working_days',
				Validators.compose([Validators.required]),
			],
			unused_leave_calc_type: [
				'all_working_days',
				Validators.compose([Validators.required]),
			],
			severance_pay_calc_type: [
				'all_working_days',
				Validators.compose([Validators.required]),
			],

			employee_start_date: [, Validators.compose([Validators.required])],
			wage: [0, Validators.compose([Validators.required])],
			grocery_allowance: [0, Validators.compose([Validators.required])],
			housing_allowance: [0, Validators.compose([Validators.required])],
			children_allowance: [0, Validators.compose([Validators.required])],

			calc_wage_monthly: [
				1,
				Validators.compose([Validators.required]),
			],
			calc_grocery_allowance_monthly: [
				1,
				Validators.compose([Validators.required]),
			],
			calc_housing_allowance_monthly: [
				1,
				Validators.compose([Validators.required]),
			],
			calc_children_allowance_monthly: [
				1,
				Validators.compose([Validators.required]),
			],
			calc_severance_pay_monthly: [
				1,
				Validators.compose([Validators.required]),
			],
			calc_new_year_gift_monthly: [1],
			calc_bonus_monthly: [
				1,
				Validators.compose([Validators.required]),
			],

			settlement_additions: this.fb.array([]),
			settlement_deductions: this.fb.array([]),
		});

		this.settlement_additions = this.contractsForm.get(
			'settlement_additions'
		) as FormArray;
		this.settlement_deductions = this.contractsForm.get(
			'settlement_deductions'
		) as FormArray;
	}

	async ngOnInit() {
		this.setTitle();
		await this.global.baseData.subscribe((value) => {
			if (value) {
				// console.log(value);
				this.settlementCalcType = value.settlement_calc_type;
			}
		});
	}

	ionViewWillEnter() {
		this.getDatas();
	}
  ionViewDidEnter(){
	
  }

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	/* ============================== All form arrays ===========================================*/
	get settlementDeductionsGroup(): FormArray {
		return this.contractsForm.get('settlement_deductions') as FormArray;
	}
	get settlementAdditionsGroup(): FormArray {
		return this.contractsForm.get('settlement_additions') as FormArray;
	}

	newSettlementDeductions(deductions: payrollDeduction[]): FormGroup {
		// console.log(deductions);
		const form = this.fb.group({});
		deductions.map((deduction: payrollDeduction) => {
			// console.log(deduction.en_name);
			if (deduction.en_name) {
				form.addControl(
					deduction.en_name,
					this.fb.control(
						'',
						deduction.isRequired ? [Validators.required] : []
					)
					// this.fb.control('', [Validators.required])
				);
			}
		});

		console.log(form);
		return form;
	}
	newSettlementAdditions(additionList: payrollAddition[]): FormGroup {
		console.log(additionList);
		const form = this.fb.group({});
		additionList.map((addition: payrollAddition) => {
			// console.log(addition.en_name);
			if (addition.en_name) {
				form.addControl(
					addition.en_name,
					this.fb.control(
						'',
						addition.isRequired ? [Validators.required] : []
					)

					// this.fb.control('')
					// this.fb.control('', [Validators.required])
				);
			}
		});

		console.log(form);
		return form;
	}

	async getDatas() {
		await this.global.showLoading();
		const limit = 3000;
		const offset = 0;
		const settlementAdditionApi = this.global.httpPost(
			'settlementAddition/filteredList',
			{ limit, offset }
		);
		const settlementDeductionApi = this.global.httpPost(
			'settlementDeduction/filteredList',
			{ limit, offset }
		);
		const settlementTemplateApi = this.global.httpPost(
			'settlementTemplate/filteredList',
			{ limit, offset }
		);
		const baceData=this.global.httpPost('settlement/detail',{id:this.settlementId })
		this.global
			.parallelRequest([
				settlementAdditionApi,
				settlementDeductionApi,
				settlementTemplateApi,
				baceData
			])
			.subscribe(
				async ([
					settlementAdditionRes,
					settlementDeductionRes = '',
					settlementTemplateRes = '',
					baceDataRes = '',
				]) => {
					await this.global.dismisLoading();
					this.setSettlementAddition(settlementAdditionRes);
					this.setPayrollDeduction(settlementDeductionRes);
					this.fillingSettlementTemplateList(settlementTemplateRes);
					this.getbaceData(baceDataRes)
				},
				async () => {
					await this.global.dismisLoading();
				}
			);
	}

 getbaceData(res:any){
//   this.global.httpPost('settlement/detail',{id:this.settlementId }).subscribe(
//     async (res:any) => {
      console.log(res);
      // this.contractsForm.patchValue(res)
	//   setTimeout(() => {
		  this.contractsForm.get('calc_bonus_monthly').setValue(res.calc_bonus_monthly)
		  this.contractsForm.get('calc_new_year_gift_monthly').setValue(res.calc_new_year_gift_monthly)
		  this.contractsForm.get('calc_severance_pay_monthly').setValue(res.calc_severance_pay_monthly)
		  this.contractsForm.get('calc_children_allowance_monthly').setValue(res.calc_children_allowance_monthly)
		  this.contractsForm.get('calc_housing_allowance_monthly').setValue(res.calc_housing_allowance_monthly)
		  this.contractsForm.get('calc_grocery_allowance_monthly').setValue(res.calc_grocery_allowance_monthly)
		  this.contractsForm.get('calc_wage_monthly').setValue(res.calc_wage_monthly)
		  this.contractsForm.get('children_allowance').setValue(res.children_allowance)
		  this.contractsForm.get('housing_allowance').setValue(res.housing_allowance)
		  this.contractsForm.get('grocery_allowance').setValue(res.grocery_allowance)
		  this.contractsForm.get('wage').setValue(res.wage)
		  this.contractsForm.get('employee_start_date').setValue(res.employee_start_date)
		  this.contractsForm.get('severance_pay_calc_type').setValue(res.severance_pay_calc_type)
		  this.contractsForm.get('unused_leave_calc_type').setValue(res.unused_leave_calc_type)
		  this.contractsForm.get('bonus_calc_type').setValue(res.bonus_calc_type)
		  this.contractsForm.get('new_year_gift_calc_type').setValue(res.new_year_gift_calc_type)
		  this.contractsForm.get('leave_work_date').setValue(res.leave_work_date)
		  this.contractsForm.get('settlement_template_id').setValue(res.settlement_template_id)
		  this.settlementDeductionsGroup.controls[0].get('loan_installment_amount').setValue(res.settlement_deductions.loan_installment_amount)
		
		console.log(   this.settlementDeductionsGroup.controls[0].get('loan_installment_amount'));
		console.log(res.loan_installment_amount);
	console.log( this.settlementDeductionsGroup.controls[0]);
		  for (const key in res.settlement_additions) {
			
			if (
			  this.settlementAdditionsGroup.controls[0].get(
				key
			  )
			) {
			  this.settlementAdditionsGroup.controls[0]
				.get(key)
				.setValue(res[key]? 1 : 0);
			}
			
			
		  }
		  for (const key in res.settlement_deductions) {
			
		
			if (
			  this.settlementDeductionsGroup.controls[0].get(
				key
			  )
			) {
			  this.settlementDeductionsGroup.controls[0]
				.get(key)
				.setValue(res[key]? 1 : 0);
			}
		  }
		  this.businessEmployeeId=res.business_employee_id
		  this.contractsForm.get('business_employee_id').setValue(res.business_employee_id)


	// }, 500);
//     },
//     async (error:any) => {
      
//     }
//   )

  }

	async calculatePrices(template: boolean = false) {
		if (template) {
			this.settlementTemplateText = '';
		}
		if (
			this.businessEmployeeId&&
			this.contractsForm.get('settlement_template_id').valid &&
			this.contractsForm.get('leave_work_date').valid &&
			this.contractsForm.get('severance_pay_calc_type').valid &&
			this.contractsForm.get('new_year_gift_calc_type').valid &&
			this.contractsForm.get('bonus_calc_type').valid &&
			this.contractsForm.get('unused_leave_calc_type').valid
		) {
			// const domy=this.contractsForm.value
			// domy['business_employee_id']=this.businessEmployeeId
			await this.global.showLoading();
			// console.log(domy);

			this.global
				.httpPost(
					'settlement/calculatePrices',
					this.contractsForm.value
				)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						console.log(res);
						// console.log(res);
						this.contractsForm.patchValue(res);
						for (const key in res) {
							console.log(key);
							console.log(
								this.settlementAdditionsGroup.controls[0].get(
									key
								)
							);
							if (
								this.settlementAdditionsGroup.controls[0].get(
									key
								)
							) {
								this.settlementAdditionsGroup.controls[0]
									.get(key)
									.setValue(res[key]);
							}
							if (
								this.settlementDeductionsGroup.controls[0].get(
									key
								)
							) {
								this.settlementDeductionsGroup.controls[0]
									.get(key)
									.setValue(res[key]);
							}
						}
						console.log(this.settlementAdditionsGroup.controls[0].value);
						console.log(this.settlementDeductionsGroup.controls[0].value);
					},
					async (error: any) => {
						await this.global.dismisLoading();
						await this.global.showError(error);
						// console.log(error);
					}
				);
		} else {
			// this.contractsForm.get('emId')?.markAllAsTouched();
			// this.contractsForm.get('bId')?.markAllAsTouched();
			// this.contractsForm.get('contract_id').markAllAsTouched();
			// this.contractsForm.get('year').markAllAsTouched();
			// this.contractsForm.get('month').markAllAsTouched();
			// this.contractsForm.get('working_hour_count').markAllAsTouched();
			// this.contractsForm.get('working_shift_id').markAllAsTouched();
		}
	}

	fillingSettlementTemplateList(data: any) {
		console.log(data);
		this.settlementTemplateList = data.list.map(
			(par: settlementTemplate): settlementTemplate => {
				return new settlementTemplate().deserialize(par);
			}
		);
		console.log(this.settlementTemplateList);
	}
	tagelttlementTemplateText() {
		console.log(
			this.contractsForm.controls['settlement_template_id'].value
		);
		if (!this.settlementTemplateText || this.settlementTemplateText == '') {
			const template = this.settlementTemplateList.find(
				(item: settlementTemplate) => {
					return (
						item.id ==
						this.contractsForm.controls['settlement_template_id']
							.value
					);
				}
			);
			console.log(template);
			this.settlementTemplateText = template.template;
		} else {
			this.settlementTemplateText = '';
		}
	}
	setSettlementAddition(settlementAdditionRes: any) {
		console.log(settlementAdditionRes);
		this.settlementAdditionList = settlementAdditionRes.list.map(
			(category: any) => {
				return new payrollAddition().deserialize(category);
			}
		);
		console.log(this.settlementAdditionList);
		this.settlement_additions.push(
			this.newSettlementAdditions(this.settlementAdditionList)
		);
	}
	setPayrollDeduction(settlementDeductionRes: any) {
		// console.log(settlementDeductionRes);
		this.settlementDeductionList = settlementDeductionRes.list.map(
			(category: any) => {
				return new payrollDeduction().deserialize(category);
			}
		);
		// console.log(this.settlementDeductionList);
		this.settlement_deductions.push(
			this.newSettlementDeductions(this.settlementDeductionList)
		);
	}
	async confirm(){
		this.global.showAlert('تایید نهایی تسویه حساب', 'آیا برای تایید تسویه حساب با این کارمند اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert : any) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpPost('settlement/confirm', {
						id: this.contractsForm.get('id').value	,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();
						this.global.showToast('تسویه حساب با موفقیت تایید شد')
					this.navCtrl.navigateForward('/businesses/detail/'+res.business_id);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});

	}
	async removeItem(){
		this.global.showAlert('حذف  تسویه حساب', 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert : any) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('settlement/delete', {
						id:  this.contractsForm.get('id').value	,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();
						this.global.showToast('تسویه حساب با موفقیت حذف شد')
					this.navCtrl.navigateForward('/businesses/detail/'+res.business_id);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}
	async onSubmit(){
		if (this.contractsForm.valid) {
			await this.global.showLoading()
			this.global.httpPatch('settlement/edit',this.contractsForm.value).subscribe(
				async (res:any) => {
					await this.global.dismisLoading()
					console.log(res);
					this.global.showToast('تسویه حساب با موفقیت ویرایش شد')
					this.navCtrl.navigateForward('/businesses/detail/'+res.business_id);
				},
				async (error:any) => {
					await this.global.dismisLoading()
					this.global.showError(error)
					console.log(error);
				}
			)
		}
	}
	
	


}
