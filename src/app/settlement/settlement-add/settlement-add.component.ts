import { Employee, businessEmployeeInfo } from './../../core/models/employee.model';
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
	selector: 'app-settlement-add',
	templateUrl: './settlement-add.component.html',
	styleUrls: ['./settlement-add.component.scss'],
})
export class SettlementAddComponent implements OnInit {
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
	custom_additions: FormArray;
	custom_deductions: FormArray;

	settlementTemplateList: settlementTemplate[];
	settlementTemplateText: string;
	businessEmployeeId: string;
	settlementAdditionList: payrollAddition[];
	settlementDeductionList: payrollDeduction[];
	settlementCalcType!:DataSets[]
	employeelist$: Observable<Employee[]>;
	employeeInputLoading = false;
	employeeInput$ = new Subject<string>();
	minLengthTerm = 3;
	businessList!: businessEmployeeInfo[];
	dataList:any
	setingCalcValue:boolean=false

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private rout: ActivatedRoute,
		
	) {

		// console.log(SettlementAddComponent);
		// console.log(SettlementAddComponent.);
		this.businessEmployeeId = rout.snapshot.paramMap.get('businessEmId');
		
		this.contractsForm = this.fb.group({
			bId: [this.businessEmployeeId],
			emId: [this.businessEmployeeId],
			business_employee_id: [this.businessEmployeeId],
			description: [],
			settlement_template_id: [
				,
				Validators.compose([Validators.required]),
			],
			// , Validators.compose([Validators.required])
			settlement_received: [],
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

			// employee_start_date: [, Validators.compose([Validators.required])],
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
			custom_additions: this.fb.array([]),
			custom_deductions: this.fb.array([]),
		});

		this.settlement_additions = this.contractsForm.get(
			'settlement_additions'
		) as FormArray;
		this.settlement_deductions = this.contractsForm.get(
			'settlement_deductions'
		) as FormArray;

		this.custom_additions = this.contractsForm.get(
			'custom_additions'
		) as FormArray;
		this.custom_deductions = this.contractsForm.get(
			'custom_deductions'
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
		this.loadEmployee()
	}

	ionViewWillEnter() {
		this.getDatas();
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
	get customDeductionsGroup(): FormArray {
		return this.contractsForm.get('custom_deductions') as FormArray;
	}
	get customAdditionsGroup(): FormArray {
		return this.contractsForm.get('custom_additions') as FormArray;
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


	
	newCustomDeductions(): FormGroup {
		return this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			amount: ['', Validators.compose([Validators.required])],
			
		}) ;
	}
	newCustomAdditions(): FormGroup {
		return this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			amount: ['', Validators.compose([Validators.required])],
			
		}) ;
	}



	// ////////


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
		this.global
			.parallelRequest([
				settlementAdditionApi,
				settlementDeductionApi,
				settlementTemplateApi,
			])
			.subscribe(
				async ([
					settlementAdditionRes,
					settlementDeductionRes = '',
					settlementTemplateRes = '',
				]) => {
					await this.global.dismisLoading();
					this.setSettlementAddition(settlementAdditionRes);
					this.setPayrollDeduction(settlementDeductionRes);
					this.fillingSettlementTemplateList(settlementTemplateRes);
				},
				async () => {
					await this.global.dismisLoading();
				}
			);
	}
	clearEmployee(){
		this.contractsForm.get('emId').setValue(null);
		this.contractsForm.get('bId').setValue(null);
		this.contractsForm.get('business_employee_id').setValue(null);
		this.employeelist$ = of([]);
		this.businessList = undefined;
		this.loadEmployee();
	}
	
	loadEmployee() {
		this.employeelist$ = concat(
			of([]), // default items
			this.employeeInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.employeeInputLoading = true)),
				switchMap((term) => {
					return this.getEmployee(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.employeeInputLoading = false))
					);
				})
			)
		);
	}

	getEmployee(term: string = null): Observable<any> {
		return this.global
			.httpPost('employee/filteredList', {
				filtered_name: term,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.pipe(
				map((resp) => {
					if (resp.Error) {
						throwError(resp.Error);
					} else {
						return resp.list.map((item: any) => {
							return new Employee().deserialize(item);
						});
					}
				})
			);
	}

	changEemployee(employee: Employee) {
		console.log(employee);
		console.log(employee?.business_employee_info);
		if (employee?.business_employee_info.length == 1) {
			// this.getContract(employee.id);
			this.businessList = undefined;
			this.contractsForm
				.get('business_employee_id')
				.setValue(employee?.business_employee_info[0].id);
				this.calculatePrices()
			// console.log( this.contractsForm.get('business_employee_id').value);
		} else if (employee?.business_employee_info.length > 1) {
			this.businessList = employee?.business_employee_info;
		} else {
			this.businessList = undefined;

			if (employee) {
				this.global.showToast(
					'متاسفانه این کارمند در هیچ کسب و کاری نیست',
					1000,
					'middle',
					'danger',
					'ios'
				);
				this.contractsForm.get('emId').setValue(null);
				this.employeelist$ = of([]);
				this.contractsForm.get('emId').markAsTouched();
				this.loadEmployee();
			}
		}
	}
	changBusiness(busines: businessEmployeeInfo) {
		// console.log(busines.business.id);
		// console.log(this.contractsForm.get('emId').value);
		// this.getContract(this.contractsForm.get('emId').value,busines.business.id);
		if (busines) {
			this.contractsForm.get('business_employee_id').setValue(busines?.id);

			console.log(this.contractsForm.get('business_employee_id').value);
			this.calculatePrices()
		}
	}

	async calculatePrices(template: boolean = false) {
		if (template) {
			this.settlementTemplateText = '';
		}
		if (!this.setingCalcValue) {
			
		
		if (
			this.contractsForm.get('business_employee_id').valid &&
			this.contractsForm.get('settlement_template_id').valid &&
			this.contractsForm.get('leave_work_date').valid &&
			this.contractsForm.get('severance_pay_calc_type').valid &&
			this.contractsForm.get('new_year_gift_calc_type').valid &&
			this.contractsForm.get('bonus_calc_type').valid &&
			this.contractsForm.get('unused_leave_calc_type').valid
		) {
			this.setingCalcValue=true
			await this.global.showLoading();
			console.log(this.contractsForm.value);
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
						this.dataList=res
						console.log(this.settlementAdditionsGroup.controls[0].value);
						console.log(this.settlementDeductionsGroup.controls[0].value);
						this.setingCalcValue=false

					},
					async (error: any) => {
						this.setingCalcValue=false

						await this.global.dismisLoading();
						await this.global.showError(error);
						// console.log(error);
					}
				);
		} else {
			this.contractsForm.get('emId')?.markAllAsTouched();
			this.contractsForm.get('bId')?.markAllAsTouched();
			// this.contractsForm.get('contract_id').markAllAsTouched();
			// this.contractsForm.get('year').markAllAsTouched();
			// this.contractsForm.get('month').markAllAsTouched();
			// this.contractsForm.get('working_hour_count').markAllAsTouched();
			// this.contractsForm.get('working_shift_id').markAllAsTouched();
		}
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
	removeCustomAdditions(index: number) {

		this.global.showAlert('حذف اضافات',
		'آیا برای حذف اضافه اطمینان دارید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					
					this.custom_additions.removeAt(index);
					this.calculatePrices()
				}
			});
		});
	}
	removeCustomDeductions(index: number) {

		this.global.showAlert('حذف کسورات',
		'آیا برای حذف کسر اطمینان دارید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					
					this.custom_deductions.removeAt(index);
					this.calculatePrices()
				}
			});
		});
	}
	
	addAnotherCustomAdditions() {
		// this.businessAddress.push(this.businessAddress.length + 1);
		this.custom_additions.push(this.newCustomAdditions());
		// console.log(this.addressFormGroup);
	}
	addAnotherCustomDeductions() {
		// this.businessAddress.push(this.businessAddress.length + 1);
		this.custom_deductions.push(this.newCustomDeductions());
		// console.log(this.addressFormGroup);
	}
	async onSubmit(){
		console.log(this.contractsForm.value);
		if (this.contractsForm.valid) {
			await this.global.showLoading()
			this.global.httpPost('settlement/add',this.contractsForm.value).subscribe(
				async (res:any) => {
					await this.global.dismisLoading()
					console.log(res);
					this.global.showToast('تسویه حساب با موفقیت ثبت شد')
					this.navCtrl.back();
					// this.navCtrl.navigateForward('/businesses/detail/'+res.business_id);
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
