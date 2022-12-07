import {
	payrollAdditiLonist,
	payrollDeductionLonist,
} from './../../../core/models/payroll-base-info.model';
import * as _ from 'lodash';

// import { sentenceTemplate } from './../../core/models/sentence.model';
import { Component, OnInit } from '@angular/core';
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

import { DataSets } from './../../../core/models/StaticData.model';
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { async } from '@angular/core/testing';
import { businessEmployeeInfo } from './../../../core/models/employee.model';
import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { format } from 'date-fns-jalali';
import { severanceBaseCalculation } from 'src/app/core/models/severanceBaseCalculation.model';

@Component({
	selector: 'app-payroll-list-add',
	templateUrl: './payroll-list-add.component.html',
	styleUrls: ['./payroll-list-add.component.scss'],
})
export class PayrollListAddComponent implements OnInit {
	pageTitle: string = 'افزودن فیش حقوقی';
	payrollForm: FormGroup;
	step: number = 1;

	payroll_additions: FormArray;
	payroll_deductions: FormArray;

	employeelist$: Observable<Employee[]>;
	employeeInputLoading = false;
	employeeInput$ = new Subject<string>();
	minLengthTerm = 3;
	businessList!: businessEmployeeInfo[];
	contractList!: contract[];
	payrollAdditionList: payrollAdditiLonist[];
	payrollDeductionList: payrollDeductionLonist[];

	yearsList!: DataSets[];
	workingShiftList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;
	calcparametr: string[] = [
		'working_day_count',
		'daily_or_hourly_wage',
		'addition_hour_friday_or_holiday',
		'sum_working_hours',
		'monthly_wage',
		'grocery_allowance',
		'housing_allowance',
		'children_allowance',
		'new_year_gift',
		'bonus',
		'severance_pay',
		'used_leave',
		'unused_leave',
		'unused_leave_amount',
		'remaining_cumulative_leave',
		'working_over_time_price',
		'working_friday_price',
		'outstation_allowance_price',
		'working_shift_price',
		'working_night_price',
		'attract_allowance',
		'trust_allowance',
		'hardship_allowance',
		'loan_received_amount',
		'insurance_allowance',
		'payroll_tax',
		'loan_installment_amount',
		'food_cost',
		'pension_cost',
		'working_deficit_amount',
		'fund_reserve_yearly_repay',
	];
	datas:any=[]

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		this.payrollForm = this.fb.group({
			emId: [, Validators.compose([Validators.required])],
			bId: ['', Validators.compose([Validators.required])],

			business_employee_id: [],
			contract_id: [, Validators.compose([Validators.required])],
			month: [, Validators.compose([Validators.required])],
			year: [, Validators.compose([Validators.required])],
			working_hour_count: [
				,
				Validators.compose([Validators.required, Validators.min(0)]),
			],
			working_deficit_hours: [0, Validators.min(0)],
			working_friday_hour_count: [0, Validators.min(0)],
			outstation_day_count: [0, Validators.min(0)],
			working_night_hour_count: [0, Validators.min(0)],
			working_over_time_hour_count: [0, Validators.min(0)],
			working_shift_id : [, Validators.required],
			payroll_additions: this.fb.array([]),
			payroll_deductions: this.fb.array([]),
		});
		this.payroll_additions = this.payrollForm.get(
			'payroll_additions'
		) as FormArray;
		this.payroll_deductions = this.payrollForm.get(
			'payroll_deductions'
		) as FormArray;
	}

	ngOnInit() {
		this.setTitle();
		this.loadEmployee();
	}

	async ionViewWillEnter() {
		await this.global.baseData.subscribe((value) => {
			if (value) {
				console.log(value);
				this.yearsList = value.years;
				this.workingShiftList = value.working_shifts;
			}
		});
		console.log(this.workingShiftList);
		
		this.monthList = this.global.monthList;
		this.getDatas();
	}

	setTitle() {
		this.seo.generateTags({
			title: 'افزودن قرارداد جدید',
			description: 'قرارداد جدی ',
			keywords: 'قرارداد جدی',
			isNoIndex: false,
		});
	}

	/* ============================== All form arrays ===========================================*/
	get payrollDeductionsGroup(): FormArray {
		return this.payrollForm.get('payroll_deductions') as FormArray;
	}
	get payrollAdditionsGroup(): FormArray {
		return this.payrollForm.get('payroll_additions') as FormArray;
	}

	newPayrollDeductions(deductions: payrollDeductionLonist[]): FormGroup {
		// console.log(deductions);
		const form = this.fb.group({});
		deductions.map((deduction: payrollDeductionLonist) => {
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

		// console.log(form);
		return form;
	}
	newPayrollAdditions(additionList: payrollAdditiLonist[]): FormGroup {
		// console.log(additionList);
		const form = this.fb.group({});
		additionList.map((addition: payrollAdditiLonist) => {
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

	/* ============================== end All form arrays ===========================================*/

	async getDatas() {
		await this.global.showLoading();
		const limit = 3000;
		const offset = 0;
		const payrollAdditionApi = this.global.httpPost(
			'payrollAddition/filteredList',
			{ limit, offset }
		);
		const payrollDeductionApi = this.global.httpPost(
			'payrollDeduction/filteredList',
			{ limit, offset }
		);
		this.global
			.parallelRequest([payrollAdditionApi, payrollDeductionApi])
			.subscribe(
				async ([payrollAdditionRes, payrollDeductionRes = '']) => {
					await this.global.dismisLoading();
					this.setPayrollAddition(payrollAdditionRes);
					this.setPayrollDeduction(payrollDeductionRes);
				},
				async () => {
					await this.global.dismisLoading();
				}
			);
	}
	async getContract(filtered_employee_id: number,filtered_business_id?:number) {
		const offset = 0;
		const limit = 3000;
		await this.global.showLoading();
		this.global
			.httpPost('contract/filteredList', {
				filtered_employee_id,
				filtered_business_id,
				limit,
				offset,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(res);
					if (res.totalRows) {
						this.contractList = res.list.map((contracts: any) => {
							return new contract().deserialize(contracts);
						});
						
					}else if(filtered_business_id){
						this.global.showToast(
							'متاسفانه این کارمند  در این کسب و کار هیچ قراردادی ندارد لطفا کسب و کار دیگری انتخاب کنید',
							1500,
							'middle',
							'danger',
							'ios'
						);
						this.payrollForm.get('bId').setValue(null);
						this.payrollForm.get('bId').markAsTouched();
						this.contractList=[]
						
					}else{
						this.global.showToast(
							'متاسفانه این کارمند  هیچ  قراردادی ندارد',
							1500,
							'middle',
							'danger',
							'ios'
						);
						this.payrollForm.get('emId').setValue(null);
						this.employeelist$ = of([]);
						this.payrollForm.get('emId').markAsTouched();
						this.loadEmployee();
						this.contractList=[]
					}
					console.log(this.contractList);
				},
				async (error: any) => {
					await this.global.dismisLoading();

					console.log(error);
				}
			);
	}
	setPayrollAddition(payrollAdditionRes: any) {
		console.log(payrollAdditionRes);
		this.payrollAdditionList = payrollAdditionRes.list.map(
			(category: any) => {
				return new payrollAdditiLonist().deserialize(category);
			}
		);
		console.log(this.payrollAdditionList);
		this.payroll_additions.push(
			this.newPayrollAdditions(this.payrollAdditionList)
		);
	}
	setPayrollDeduction(payrollDeductionRes: any) {
		console.log(payrollDeductionRes);
		this.payrollDeductionList = payrollDeductionRes.list.map(
			(category: any) => {
				return new payrollDeductionLonist().deserialize(category);
			}
		);
		console.log(this.payrollDeductionList);
		this.payroll_deductions.push(
			this.newPayrollDeductions(this.payrollDeductionList)
		);
	}

async	calculatePrices() {
	
		if (
			this.payrollForm.get('business_employee_id').valid &&
			this.payrollForm.get('contract_id').valid &&
			this.payrollForm.get('year').valid &&
			this.payrollForm.get('month').valid &&
			this.payrollForm.get('working_hour_count').valid&&
			this.payrollForm.get('working_shift_id').valid
		) {
			await this.global.showLoading()
			console.log(this.payrollForm.value);
			this.global.httpPost('payroll/calculatePrices',
			this.payrollForm.value).subscribe(
				async (res:any) => {
					await this.global.dismisLoading()
					// console.log(res);
					// console.log(res);
					for (const key in res) {
						console.log(key);
						console.log(this.payrollAdditionsGroup.controls[0].get(key));
						if (this.payrollAdditionsGroup.controls[0].get(key)) {
							this.payrollAdditionsGroup.controls[0].get(key).setValue(res[key])
						}
						if (this.payrollDeductionsGroup.controls[0].get(key)) {
							this.payrollDeductionsGroup.controls[0].get(key).setValue(res[key])
						}
					}
				
				},
				async (error:any) => {
					await this.global.dismisLoading()
					await this.global.showError(error)
					// console.log(error);
				},
			)
		}else{
			this.payrollForm.get('emId')?.markAllAsTouched() 
			this.payrollForm.get('bId')?.markAllAsTouched() 
			this.payrollForm.get('contract_id').markAllAsTouched() 
			this.payrollForm.get('year').markAllAsTouched() 
			this.payrollForm.get('month').markAllAsTouched() 
			this.payrollForm.get('working_hour_count').markAllAsTouched()
			this.payrollForm.get('working_shift_id').markAllAsTouched()
		}
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
			this.getContract(employee.id);
			this.businessList = undefined;
			this.payrollForm
				.get('business_employee_id')
				.setValue(employee?.business_employee_info[0].id);
				this.calculatePrices()
			// console.log( this.payrollForm.get('business_employee_id').value);
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
				this.payrollForm.get('emId').setValue(null);
				this.employeelist$ = of([]);
				this.payrollForm.get('emId').markAsTouched();
				this.loadEmployee();
			}
		}
	}
	changBusiness(busines: businessEmployeeInfo) {
		console.log(busines.business.id);
		console.log(this.payrollForm.get('emId').value);
		this.getContract(this.payrollForm.get('emId').value,busines.business.id);
		if (busines) {
			this.payrollForm.get('business_employee_id').setValue(busines?.id);

			console.log(this.payrollForm.get('business_employee_id').value);
			this.calculatePrices()
		}
	}

	// async onSubmit() {
	// 	console.log(this.payrollForm.value);
	// 	console.log(this.payrollForm.get('emId').valid);
	// 	console.log(this.payrollForm.get('bId')?.valid);
	// 	this.payrollForm.markAllAsTouched();
	// 	if (
	// 		(this.payrollForm.get('emId').valid &&
	// 			this.payrollForm.get('bId')?.valid) ||
	// 		(this.payrollForm.get('emId').valid &&
	// 			(!this.businessList || this.businessList.length == 1))
	// 	) {
	// 		// this.payrollForm.get('bId').d
	// 		this.payrollForm.removeControl('emId');
	// 		this.payrollForm.removeControl('bId');
	// 		console.log(this.payrollForm.value);
	// 		console.log(this.payrollForm.valid);
	// 		if (this.payrollForm.valid) {
	// 			await this.global.showLoading();
	// 			this.global
	// 				.httpPost('payroll/add', this.payrollForm.value)
	// 				.subscribe(
	// 					async (res: any) => {
	// 						await this.global.dismisLoading();
	// 						this.payrollForm.addControl(
	// 							'emId',
	// 							this.fb.control('', [Validators.required])
	// 						);
	// 						this.payrollForm.addControl(
	// 							'bId',
	// 							this.fb.control('', [Validators.required])
	// 						);
	// 						this.payrollForm.reset();
						
	// 						this.global.showToast('فیش حقوقی با موفقیت ثبت شد' ,700,'top','success','ios')
	// 						this.navCtrl.navigateForward(
	// 							'/payrolls/payroll/list'
	// 						);
	// 						console.log(res);
	// 					},
	// 					async (error: any) => {
	// 						await this.global.dismisLoading();
	// 						await this.global.showError(error);
	// 						this.payrollForm.addControl(
	// 							'emId',
	// 							this.fb.control('', [Validators.required])
	// 						);
	// 						this.payrollForm.addControl(
	// 							'bId',
	// 							this.fb.control('', [Validators.required])
	// 						);
	// 						this.payrollForm.reset();
	// 					}
	// 				);
	// 		}
	// 	}
	// }
	onSubmit(e:any){
		let sendObj={
			business_id:23,
			month:2,
			year:1400,
			detail:e
		}
		console.log(sendObj);
	}

}
