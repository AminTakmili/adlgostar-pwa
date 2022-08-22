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
	@ViewChildren('validation') validation: QueryList<any>;
	pageTitle: string = 'افزودن قرار داد';
	payrollForm: FormGroup;
	step: number = 1;
	// public Editor = ClassicEditor;

	editors = ['Classic', 'Inline'];

	@ViewChild('popoverDatetime2', { static: true }) datetime: IonDatetime;

	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D',
	};
	submitet: boolean = false;

	provisosList: FormArray;
	extraFieldsList: FormArray;
	childrenAllowancesList: FormArray;
	contractHeaderTemplateInfoList: FormArray;
	contractFooterTemplateInfoList: FormArray;

	employeelist$: Observable<Employee[]>;
	employeeInputLoading = false;
	employeeInput$ = new Subject<string>();
	minLengthTerm = 3;
	businessList!: businessEmployeeInfo[];
  contractList!:contract[]

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		this.payrollForm = this.fb.group({
			emId: [, Validators.compose([Validators.required])],
			bId: [, Validators.compose([Validators.required])],
      
			business_employee_id: [],
    	    contract_id: [, Validators.compose([Validators.required])],


			all_working_days: [
				'all_working_days',
				Validators.compose([Validators.required]),
			],
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
			calc_wage_monthly: [
				true,
				Validators.compose([Validators.required]),
			],
			calc_grocery_allowance_monthly: [
				true,
				Validators.compose([Validators.required]),
			],
			calc_housing_allowance_monthly: [
				true,
				Validators.compose([Validators.required]),
			],
			calc_children_allowance_monthly: [
				true,
				Validators.compose([Validators.required]),
			],
			calc_severance_pay_monthly: [
				true,
				Validators.compose([Validators.required]),
			],
			calc_bonus_monthly: [
				true,
				Validators.compose([Validators.required]),
			],

			title: ['', Validators.compose([Validators.required])],
			business_id: [, Validators.compose([Validators.required])],
			contract_condition_id: [''],
			employee_ids: [[], Validators.compose([Validators.required])],
			employer_ids: [[], Validators.compose([Validators.required])],
			business_employee_ids: [
				[],
				Validators.compose([Validators.required]),
			],
			contract_template_id: [
				'',
				Validators.compose([Validators.required]),
			],
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
			calc_payroll_tax: [
				'all_working_days',
				Validators.compose([Validators.required]),
			],
			calc_unused_leave_monthly: [
				0,
				Validators.compose([Validators.required]),
			],
			calc_severance_base: [true],
			calc_new_year_gift_monthly: [true],
			is_contract_for_future: [false],
			is_hourly_contract: [false],
			is_manual: [false],

			children_allowances: this.fb.array([]),
			provisos: this.fb.array([]),
			extra_fields: this.fb.array([]),
			contract_header_template_info: this.fb.array([
				this.newContractHeaderTemplateInfoList(),
			]),
			contract_footer_template_info: this.fb.array([
				this.newContractFooterTemplateInfoList(),
			]),
		});

		this.provisosList = this.payrollForm.get('provisos') as FormArray;
		this.extraFieldsList = this.payrollForm.get(
			'extra_fields'
		) as FormArray;
		this.childrenAllowancesList = this.payrollForm.get(
			'children_allowances'
		) as FormArray;
		this.contractHeaderTemplateInfoList = this.payrollForm.get(
			'contract_header_template_info'
		) as FormArray;
		this.contractFooterTemplateInfoList = this.payrollForm.get(
			'contract_footer_template_info'
		) as FormArray;
	}

	ngOnInit() {
		this.setTitle();
		this.loadEmployee();
	}

	ionViewWillEnter() {}

	setTitle() {
		this.seo.generateTags({
			title: 'افزودن قرار داد جدید',
			description: 'قرار داد جدی ',
			keywords: 'قرار داد جدی',
			isNoIndex: false,
		});
	}

	/* ============================== All form arrays ===========================================*/
	get contractHeaderTemplateInfoListGroup(): FormArray {
		return this.payrollForm.get(
			'contract_header_template_info'
		) as FormArray;
	}
	get contractFooterTemplateInfoListGroup(): FormArray {
		return this.payrollForm.get(
			'contract_footer_template_info'
		) as FormArray;
	}

	newContractHeaderTemplateInfoList(): FormGroup {
		return this.fb.group({
			contract_header_template_id: [],
			header_text: [],
		});
	}
	newContractFooterTemplateInfoList(): FormGroup {
		return this.fb.group({
			contract_footer_template_id: [],
			footer_text: [],
		});
	}

	provisos(id: number, text = ''): FormGroup {
		return this.fb.group({
			contract_proviso_template_id: [
				id,
				Validators.compose([Validators.required]),
			],
			proviso_text: [text, Validators.compose([Validators.required])],
		});
	}
	get provisosFormGroup(): FormArray {
		return this.payrollForm.get('provisos') as FormArray;
	}

	extraFields(id: number): FormGroup {
		return this.fb.group({
			contract_extra_field_id: [
				id,
				Validators.compose([Validators.required]),
			],
			price: [0, Validators.compose([Validators.required])],
		});
	}

	get extraFieldsFormGroup(): FormArray {
		return this.payrollForm.get('extra_fields') as FormArray;
	}

	childrenAllowance(
		business_employee_id: number,
		employee_id: number
	): FormGroup {
		return this.fb.group({
			business_employee_id: [
				business_employee_id,
				Validators.compose([Validators.required]),
			],
			employee_id: [
				employee_id,
				Validators.compose([Validators.required]),
			],
			children_allowance: [0, Validators.compose([Validators.required])],
		});
	}

	get childrenAllowanceFormGroup(): FormArray {
		return this.payrollForm.get('children_allowances') as FormArray;
	}

	/* ============================== end All form arrays ===========================================*/

	getDatas(){
	
		// this.global.parallelRequest()
	}
	async getContract(filtered_employee_id:number){
		const offset=0
		const limit=3000
		await this.global.showLoading()
		this.global.httpPost('contract/filteredList',{filtered_employee_id,limit,offset}).subscribe(
			async (res:any) => {
				await this.global.dismisLoading()
				console.log(res);
			},
			async (error:any) => {
				await this.global.dismisLoading()

				console.log(error);
			},
		)
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
			this.businessList = undefined;
			this.payrollForm
				.get('business_employee_id')
				.setValue(employee?.business_employee_info[0].id);
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
		console.log(busines);
		if (busines) {
			this.payrollForm.get('business_employee_id').setValue(busines?.id);

			console.log(this.payrollForm.get('business_employee_id').value);
		}
	}

async	onSubmit() {
		console.log(this.payrollForm.value);
		console.log(this.payrollForm.get('emId').valid);
		console.log(this.payrollForm.get('bId').valid);
		this.payrollForm.markAllAsTouched();
		if (
			(this.payrollForm.get('emId').valid &&
				this.payrollForm.get('bId').valid) ||
			(this.payrollForm.get('emId').valid &&
				(!this.businessList || this.businessList.length == 1))
		) {
			// this.payrollForm.get('bId').d
			this.payrollForm.removeControl('emId');
			this.payrollForm.removeControl('bId');
		}

		console.log(this.payrollForm.value);
    console.log(this.payrollForm.valid);
		if (this.payrollForm.valid) {
     await this.global.showLoading()
			this.global
				.httpPost('payroll/add', this.payrollForm.value)
				.subscribe(
					async (res: any) => {
            await this.global.dismisLoading()
            this.payrollForm.addControl('emId', this.fb.control('', [Validators.required])); 
            this.payrollForm.addControl('bId', this.fb.control('', [Validators.required])); 
              this.payrollForm.reset()
            

          },
					async (error: any) => {
            await this.global.dismisLoading()
            await this.global.showError(error)
            this.payrollForm.addControl('emId', this.fb.control('', [Validators.required])); 
            this.payrollForm.addControl('bId', this.fb.control('', [Validators.required])); 
              this.payrollForm.reset()


          }
				);
		}
	}
}
