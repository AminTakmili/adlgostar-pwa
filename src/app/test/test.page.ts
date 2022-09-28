import { concat, Observable, of, Subject, throwError } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	switchMap,
	tap,
	map,
	filter,
} from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, MenuController } from '@ionic/angular';
import { Employee } from '../core/models/employee.model';
import { GlobalService } from '../core/services/global.service';
import { SeoService } from '../core/services/seo.service';
import { User } from '../core/models/user.model';

@Component({
	selector: 'app-test',
	templateUrl: './test.page.html',
	styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
	dataList: Employee[] = [];
	limit: number = 20;
	offset: number = 0;
	total: number = 0;
	loading = false;
	end: boolean = false;
	searchVal: string;
	employeelist$: Observable<Employee[]>;
	inputLoading = false;
	employeeInput$ = new Subject<string>();
	minLengthTerm: number = 3;

	apiObj: any = {
		totalRows: 20,
		list: [
			{
				employee_id: '1 کد کارمند',
		
				full_name: '1 نام کارمند',
		
				working_shift_id: '1 شیفت کاری',
		
				working_day_count: '1 تعداد روز کارکرد',
		
				working_hour_count: '1 ساعت کارکرد',
		
				addition_hour_friday_or_holiday: '1 ساعت تعطیل و جمعه کاری',
		
				sum_working_hours: '1 جمع کل ساعت کار',
		
				daily_or_hourly_wage: '1 حقوق ثابت ',
		
				grocery_allowance: '1 حق بن',
		
				housing_allowance: '1 حق مسکن',
		
				children_allowance: '1 حق اولاد',
		
				severance_pay: '1 حق سنوات',
		
				new_year_gift: '1 عیدی',
		
				bonus: '1 پاداش',
		
				working_over_time_hour_count: '1 ساعت اضافه کاری',
		
				working_over_time_price: '1 مبلغ اضافه کاری',
		
				working_friday_hour_count: '1 ساعت جمعه کاری',
		
				working_friday_price: '1 مبلغ جمعه کاری',
		
				working_holiday_count: '1 ساعت تعطیل کاری',
		
				working_holiday_price: '1 مبلغ تعطیل کاری',
		
				working_night_hour_count: '1 ساعت شب کاری',
		
				working_night_price: '1 مقدار شب کاری',
		
				unused_leave_amount: '1 مبلغ مرخصی استفاده نشده',
		
				unused_leave: '1 تعداد مرخصی استفاده نشده',
		
				used_leave: '1 تعداد مرخصی استفاده شده',
		
				operation_bonus: '1 پاداش عملکرد',
		
				// اضافات اکسل
		
				outstation_day_count: '1 تعداد روز ماموریت',
		
				outstation_allowance_price: '1 مبلغ حق ماموریت',
		
				working_shift_price: '1 مبلغ شیفت کاری',
		
				remaining_cumulative_leave: '1 مانده مرخصی تجمیعی',
		
				commission: '1 کمسیون',
		
				car_fuel: '1 حق سوخت',
		
				attract_allowance: '1 حق جذب',
		
				trust_allowance: '1 حق مسئولیت',
		
				hardship_allowance: '1 حق سختی کار ',
		
				transportation_price: '1 هزینه ایاب و ذهاب',
		
				loan_received_amount: '1 مبلغ وام دریافتی',
		
				sum_payroll_additions: '1 جمع اضافات',
		
				insurance_day_count: '1 تعداد روز بیمه',
		
				insurance_wage: '1 مبلغ دستمزد روزانه حق بیمه',
		
				insurance_allowance: '1 70% حق بیمه',
		
				employer_insurance_allowance: '1 حق بیمه سهم کارفرما',
		
				payroll_tax: '1 مالیات بر حقوق',
		
				working_deficit_hours: '1 ساعت کسر کار',
		
				working_deficit_amount: '1 مقدار کسر کار',
		
				loan_installment_amount: '1 کسر وام',
		
				advance_money: '1 کسر مساعده',
		
				purchase_invoice_from_company: '1 خرید از شرکت',
		
				food_cost: '1 حق غذا',
		
				pension_cost: '1 هزینه پانسیون',
		
				//  اضافه اکسل
		
				delay_penalty: '1 جریمه تاخیر',
		
				absence_penalty: '1 جریمه غیبت',
		
				fund_reserve: '1 ذخیره صندوق',
		
				fund_reserve_yearly_repay: '1 بازپرداخت ذخیره صندوق سالیانه',
		
				sum_payroll_deductions: '1 جمع کسورات',
		
				payroll_received: '1 خالص دریافتی',
		
				payment_date: '1 تاریخ واریز حقوق',
		
				inverse_payroll_received: '1 مبلغ حقوق خالص معکوس',
		
				sum_over_night_friday_amounts: '1 اضافه کاری و شبکاری و جمعه کاری',
		
				without_pay_leave: '1 تعداد مرخصی بدون حقوق',
		
				without_pay_leave_amount: '1 مبلغ مرخصی بدون حقوق',
			},
			{
				employee_id: '2کد کارمند',
		
				full_name: '2نام کارمند',
		
				working_shift_id: '2شیفت کاری',
		
				working_day_count: '2تعداد روز کارکرد',
		
				working_hour_count: '2ساعت کارکرد',
		
				addition_hour_friday_or_holiday: '2ساعت تعطیل و جمعه کاری',
		
				sum_working_hours: '2جمع کل ساعت کار',
		
				daily_or_hourly_wage: '2حقوق ثابت ',
		
				grocery_allowance: '2حق بن',
		
				housing_allowance: '2حق مسکن',
		
				children_allowance: '2حق اولاد',
		
				severance_pay: '2حق سنوات',
		
				new_year_gift: '2عیدی',
		
				bonus: '2پاداش',
		
				working_over_time_hour_count: '2ساعت اضافه کاری',
		
				working_over_time_price: '2مبلغ اضافه کاری',
		
				working_friday_hour_count: '2ساعت جمعه کاری',
		
				working_friday_price: '2مبلغ جمعه کاری',
		
				working_holiday_count: '2ساعت تعطیل کاری',
		
				working_holiday_price: '2مبلغ تعطیل کاری',
		
				working_night_hour_count: '2ساعت شب کاری',
		
				working_night_price: '2مقدار شب کاری',
		
				unused_leave_amount: '2مبلغ مرخصی استفاده نشده',
		
				unused_leave: '2تعداد مرخصی استفاده نشده',
		
				used_leave: '2تعداد مرخصی استفاده شده',
		
				operation_bonus: '2پاداش عملکرد',
		
				// اضافات اکسل
		
				outstation_day_count: '2تعداد روز ماموریت',
		
				outstation_allowance_price: '2مبلغ حق ماموریت',
		
				working_shift_price: '2مبلغ شیفت کاری',
		
				remaining_cumulative_leave: '2مانده مرخصی تجمیعی',
		
				commission: '2کمسیون',
		
				car_fuel: '2حق سوخت',
		
				attract_allowance: '2حق جذب',
		
				trust_allowance: '2حق مسئولیت',
		
				hardship_allowance: '2حق سختی کار ',
		
				transportation_price: '2هزینه ایاب و ذهاب',
		
				loan_received_amount: '2مبلغ وام دریافتی',
		
				sum_payroll_additions: '2جمع اضافات',
		
				insurance_day_count: '2تعداد روز بیمه',
		
				insurance_wage: '2مبلغ دستمزد روزانه حق بیمه',
		
				insurance_allowance: '270% حق بیمه',
		
				employer_insurance_allowance: '2حق بیمه سهم کارفرما',
		
				payroll_tax: '2مالیات بر حقوق',
		
				working_deficit_hours: '2ساعت کسر کار',
		
				working_deficit_amount: '2مقدار کسر کار',
		
				loan_installment_amount: '2کسر وام',
		
				advance_money: '2کسر مساعده',
		
				purchase_invoice_from_company: '2خرید از شرکت',
		
				food_cost: '2حق غذا',
		
				pension_cost: '2هزینه پانسیون',
		
				//  اضافه اکسل
		
				delay_penalty: '2جریمه تاخیر',
		
				absence_penalty: '2جریمه غیبت',
		
				fund_reserve: '2ذخیره صندوق',
		
				fund_reserve_yearly_repay: '2بازپرداخت ذخیره صندوق سالیانه',
		
				sum_payroll_deductions: '2جمع کسورات',
		
				payroll_received: '2خالص دریافتی',
		
				payment_date: '2تاریخ واریز حقوق',
		
				inverse_payroll_received: '2مبلغ حقوق خالص معکوس',
		
				sum_over_night_friday_amounts: '2اضافه کاری و شبکاری و جمعه کاری',
		
				without_pay_leave: '2تعداد مرخصی بدون حقوق',
		
				without_pay_leave_amount: '2مبلغ مرخصی بدون حقوق',
			},
		],
	};
	datas: any;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		public alertController: AlertController,
		private menu: MenuController
	) {}

	ngOnInit() {
		this.getData();
		this.loadEmployee(true);
		this.employeeInput$.next(null);
	}
	async getData() {
		if (this.dataList.length > 0 && this.end) {
			return;
		}
		this.loading = true;
		this.global
			.httpPost('employee/filteredList', {
				limit: this.limit,
				offset: this.offset,
				filtered_name: this.searchVal,
			})
			.subscribe(
				async (res: any) => {
					// /////////////////////////////////////////////////
					this.datas = this.apiObj.list;
					// this.datas.map((item: any) => {
						
					// 	let full_name = item.find((em:any)=>{return em[0].en_name=='first_name'})[0].value+' '+item.find((em:any)=>{return em[0].en_name=='last_name'})[0].value
					// 	item.splice(1, 0, [{ en_name: 'full_name', value: full_name, readonly: item.find((em:any)=>{return em[0].en_name=='first_name'})[0].readonly }])
					// 	item.splice(item.indexOf( item.find((em:any)=>{return em[0].en_name=='first_name'})), 1);
					// 	item.splice(item.indexOf( item.find((em:any)=>{return em[0].en_name=='last_name'})), 1);
						
					
					// });
				
					// console.log(this.datas);
					//
					this.total = res.totalRows;
					this.loading = false;
					if (res.list.length < this.limit) {
						this.end = true;
					}
					this.offset = this.offset + this.limit;

					const data = res.list.map((item: any) => {
						return new Employee().deserialize(item);
						// this.dataList.push(data);
					});
					this.dataList = this.dataList.concat(data);
					// this.dataList.concat(data);
					// console.log(this.dataList);
				},
				async (error: any) => {
					this.loading = false;
					this.global.showError(error);
				}
			);
	}

	onScrollToEnd() {
		// console.log('onScroll');
		this.end = true;
		// this.getData();
	}

	onScroll({ end }: any) {
		// console.log(end + this.limit, this.dataList.length)
		if (this.loading || this.total <= this.dataList.length) {
			// console.log('end 1');
			return;
		}

		if (end + this.limit >= this.dataList.length) {
			// console.log('end 2');
			this.getData();
		}
	}

	searchFun(event: any) {
		this.searchVal = event.term;
		this.loading = true;
		this.offset = 0;
		this.end = false;
		this.getData();
	}
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	loadEmployee(wantAll: boolean = false) {
		this.employeelist$ = concat(
			of([]), // default items
			this.employeeInput$.pipe(
				filter((res) => {
					if (!wantAll) {
						return res !== null && res.length >= this.minLengthTerm;
					} else {
						return true;
					}
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.inputLoading = true)),
				switchMap((term) => {
					return this.getEmployee(term, wantAll).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.inputLoading = false))
					);
				})
			)
		);
	}

	getEmployee(
		term: string = null,
		wantAll: boolean = false
	): Observable<any> {
		console.log('object');
		const api = this.global
			.httpPost('employee/filteredList', {
				filtered_name: wantAll ? '' : term,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.pipe(
				map((resp) => {
					if (resp.Error) {
						throwError(resp.Error);
					} else {
						const employeeList = resp.list.map((item: any) => {
							console.log(item);
							return new Employee().deserialize(item);
						});
						if (wantAll) {
							this.employeelist$ = employeeList;
						} else {
							return employeeList;
						}
					}
				})
			);

		return api;
	}
	async getEmployeeById(employee_id: string = null) {
		await this.global.showLoading();
		console.log(employee_id);
		this.global
			.httpPost('employee/filteredList', {
				employee_id,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(of(res.list), res.list[0].id);
					this.employeelist$ = of(
						res.list.map((item: any) => {
							return new Employee().deserialize(item);
						})
					);

					// this.addForm.get('employee_id').setValue(res.list[0]?.id);
				},
				async (error: any) => {
					await this.global.dismisLoading();

					this.global.showError(error);
					console.log(error);
				}
			);
	}

	// 
	// ////////////////////////////////////////////////
	onSubmit(e:any){
		let sendObj={
			business_id:23,
			month:2,
			year:1400,
			list:e
		}
		console.log(sendObj);
	}
}
