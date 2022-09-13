import { DataSets } from 'src/app/core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
	selector: 'app-excel',
	templateUrl: './excel.component.html',
	styleUrls: ['./excel.component.scss'],
})
export class ExcelComponent implements OnInit, OnChanges {
	@Input() list: object[];
	@Input() month: number;
	@Input() year: number;

	@Output() Data = new EventEmitter<any>();

	cellClickValue!: string;
	gridColumns: number = 55;
	gridRows: number = 50;
	excelForm: FormGroup;
	excelCell: FormArray;
	alfaArray: any;

	excelBaceColumnsTitle: any = {
		employee_id: 'کد کارمند',

		full_name: 'نام کارمند',

		working_shift_id: 'شیفت کاری',

		working_day_count: 'تعداد روز کارکرد',

		working_hour_count: 'ساعت کارکرد',

		addition_hour_friday_or_holiday: 'ساعت تعطیل و جمعه کاری',

		sum_working_hours: 'جمع کل ساعت کار',

		daily_or_hourly_wage: 'حقوق ثابت ',
		monthly_wage: 'حقوق ماهانه ',


		grocery_allowance: 'حق بن',

		housing_allowance: 'حق مسکن',

		children_allowance: 'حق اولاد',

		severance_pay: 'حق سنوات',

		new_year_gift: 'عیدی',

		bonus: 'پاداش',

		working_over_time_hour_count: 'ساعت اضافه کاری',

		working_over_time_price: 'مبلغ اضافه کاری',

		working_friday_hour_count: 'ساعت جمعه کاری',

		working_friday_price: 'مبلغ جمعه کاری',


		working_night_hour_count: 'ساعت شب کاری',

		working_night_price: 'مبلغ شب کاری',

		unused_leave_amount: 'مبلغ مرخصی استفاده نشده',

		unused_leave: 'تعداد مرخصی استفاده نشده',

		used_leave: 'تعداد مرخصی استفاده شده',

		operation_bonus: 'پاداش عملکرد',

		// اضافات اکسل

		outstation_day_count: 'تعداد روز ماموریت',

		outstation_allowance_price: 'مبلغ حق ماموریت',

		working_shift_price: 'مبلغ شیفت کاری',

		remaining_cumulative_leave: 'مانده مرخصی تجمیعی',

		commission: 'پورسانت',

		car_fuel: 'هزینه سوخت خودرو',

		attract_allowance: 'حق جذب',

		trust_allowance: 'حق مسئولیت',

		hardship_allowance: 'حق سختی کار ',

		transportation_price: 'هزینه ایاب و ذهاب',

		loan_received_amount: 'مبلغ وام دریافتی',

		sum_payroll_additions: 'جمع اضافات',

		insurance_day_count: 'تعداد روز بیمه',

		insurance_wage: 'مبلغ دستمزد روزانه حق بیمه',

		insurance_allowance: '7% حق بیمه',

		employer_insurance_allowance: 'حق بیمه سهم کارفرما',

		payroll_tax: 'مالیات بر حقوق',

		working_deficit_hours: 'ساعت کسر کار',

		working_deficit_amount: 'مقدار کسر کار',

		loan_installment_amount: 'کسر قسط وام',

		advance_money: 'کسر مساعده',

		purchase_invoice_from_company: 'خرید از شرکت',

		food_cost: 'هزینه استفاده از غذای پرسنلی ',

		pension_cost: 'هزینه اجاره پانسیون ',

		//  اضافه اکسل

		// delay_penalty: 'جریمه تاخیر',

		// absence_penalty: 'جریمه غیبت',

		fund_reserve: 'ذخیره صندوق',

		fund_reserve_yearly_repay: 'بازپرداخت ذخیره صندوق سالیانه',

		sum_payroll_deductions: 'جمع کسورات',

		payroll_received: 'خالص دریافتی',

		payment_date: 'تاریخ واریز حقوق',

		inverse_payroll_received: 'مبلغ حقوق خالص معکوس',

		sum_over_night_friday_amounts: 'اضافه کاری و شبکاری و جمعه کاری',

		without_pay_leave: 'تعداد مرخصی بدون حقوق',

		without_pay_leave_amount: 'مبلغ مرخصی بدون حقوق',
		calc_unused_leave_monthly: ' مرخصی استفاده نشده محاسبه میشود؟',
		calc_payroll_tax: 'مالیات محاسبه میشود؟',
	};

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
	workingShiftsList: DataSets[];

	allDataInpu: any;
	// outputData: any = [];
	constructor(private fb: FormBuilder, private global: GlobalService) {
	
	}

	async ngOnInit() {
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.workingShiftsList = value.working_shifts;
				// console.log(this.workingShiftsList);
			}
		});
	}
	ngOnChanges(changes: SimpleChanges) {
		this.excelForm = this.fb.group({
			excelCell: this.fb.array([]),
		});
		this.excelCell = this.excelForm.get('excelCell') as FormArray;
		// console.log(this.excelForm.controls);
		// console.log(this.excelCell);
		if (this.excelCellGroup.controls&&this.excelCellGroup.controls.length) {
			// for (let index =1; index <=this.excelCellGroup.controls.length; index++) {
			// 	console.log(this.excelCellGroup.controls[index]);
			// 	// console.log(this.excelCell.controls[index]);
			// 	this.excelCell.removeAt(index)
				
			// }
			
			// this.excelForm.reset()
		}
		// console.log(this.excelCell);
		this.allDataInpu = []

		console.log(changes);
		this.allDataInpu = [
			this.excelBaceColumnsTitle,
			...changes?.list?.currentValue,
		];
		// this.outputData = this.allDataInpu;
		// console.log(changes.list.currentValue);
		

		console.log(this.allDataInpu);
		this.gridRows = this.allDataInpu.length;
		// * +1 for checkbox 
		
		this.gridColumns = Object.keys(this.allDataInpu[0]).length +1;
		// console.log(this.gridColumns,this.gridRows);
		this.creatAlfab(this.gridColumns);
		// this.gridColumns=Object.keys(this.excelBaceColumnsTitle).length;
		// console.log(this.gridRows, this.gridColumns);
		this.allDataInpu.map((item: object[]) => {
			// console.log(item);
			this.excelCell.push(this.newexcelCell(item));
		});
		// console.log(this.excelCell);
	}

	// coment html
	setCellClickValue(e: any) {
		this.cellClickValue = e.path[0].value;
		// console.log(e.path[0].value);
		if (e.detail.value) {
			this.cellClickValue = e.detail.value;
			console.log(e.detail.value);
		}
	}

	/* ============================== All form arrays ===========================================*/
	get excelCellGroup(): FormArray {
		return this.excelForm.get('excelCell') as FormArray;
	}

	newexcelCell(employee: any): FormGroup {
		// console.log(employee, employee.employee_id);
		return this.fb.group({
			isWant: [true],
			id: [employee.id],
			contract_id: [employee.contract_id],
			business_employee_id: [employee.business_employee_id],
			employee_id: [employee.employee_id],
			full_name: [employee.full_name],
			working_shift_id: [employee.working_shift_id?employee.working_shift_id:' '],
			working_day_count: [employee.working_day_count],
			working_hour_count: [employee.working_hour_count],
			addition_hour_friday_or_holiday: [
				employee.addition_hour_friday_or_holiday,
			],
			sum_working_hours: [employee.sum_working_hours],
			daily_or_hourly_wage: [employee.daily_or_hourly_wage],
			monthly_wage: [employee.monthly_wage],
			grocery_allowance: [employee.grocery_allowance],
			housing_allowance: [employee.housing_allowance],
			children_allowance: [employee.children_allowance],
			severance_pay: [employee.severance_pay],
			new_year_gift: [employee.new_year_gift],
			bonus: [employee.bonus],
			working_over_time_hour_count: [
				employee.working_over_time_hour_count,
			],
			working_over_time_price: [employee.working_over_time_price],
			working_friday_hour_count: [employee.working_friday_hour_count],
			working_friday_price: [employee.working_friday_price],
		
			working_night_hour_count: [employee.working_night_hour_count],
			working_night_price: [employee.working_night_price],
			unused_leave_amount: [employee.unused_leave_amount],
			unused_leave: [employee.unused_leave],
			used_leave: [employee.used_leave],
			operation_bonus: [employee.operation_bonus],
			outstation_day_count: [employee.outstation_day_count],
			outstation_allowance_price: [employee.outstation_allowance_price],
			working_shift_price: [employee.working_shift_price],
			remaining_cumulative_leave: [employee.remaining_cumulative_leave],
			commission: [employee.commission],
			car_fuel: [employee.car_fuel],
			attract_allowance: [employee.attract_allowance],
			trust_allowance: [employee.trust_allowance],
			hardship_allowance: [employee.hardship_allowance],
			transportation_price: [employee.transportation_price],
			loan_received_amount: [employee.loan_received_amount],
			sum_payroll_additions: [employee.sum_payroll_additions],
			insurance_day_count: [employee.insurance_day_count],
			insurance_wage: [employee.insurance_wage],
			insurance_allowance: [employee.insurance_allowance],
			employer_insurance_allowance: [
				employee.employer_insurance_allowance,
			],
			payroll_tax: [employee.payroll_tax],
			working_deficit_hours: [employee.working_deficit_hours],
			working_deficit_amount: [employee.working_deficit_amount],
			loan_installment_amount: [employee.loan_installment_amount],
			advance_money: [employee.advance_money],
			purchase_invoice_from_company: [
				employee.purchase_invoice_from_company,
			],
			food_cost: [employee.food_cost],
			pension_cost: [employee.pension_cost],
			// حذف شدن
			delay_penalty: [employee.delay_penalty],
			absence_penalty: [employee.absence_penalty],
			// 
			fund_reserve: [employee.fund_reserve],
			fund_reserve_yearly_repay: [employee.fund_reserve_yearly_repay],
			sum_payroll_deductions: [employee.sum_payroll_deductions],
			payroll_received: [employee.payroll_received],
			payment_date: [employee.payment_date],
			inverse_payroll_received: [employee.inverse_payroll_received],
			sum_over_night_friday_amounts: [
				employee.sum_over_night_friday_amounts,
			],
			without_pay_leave: [employee.without_pay_leave],
			without_pay_leave_amount: [employee.without_pay_leave_amount],
			calc_unused_leave_monthly: [ employee.calc_unused_leave_monthly==0?'خیر':employee.calc_unused_leave_monthly==1?'بله':employee.calc_unused_leave_monthly],
			calc_payroll_tax: [ employee.calc_payroll_tax==0?'خیر':employee.calc_payroll_tax==1?'بله':employee.calc_payroll_tax],
			// calc_payroll_tax: [employee.calc_payroll_tax==0?'خیر':'بله'],
		});
	}
	//
	creatAlfab(count: number) {
		let alfaArr = [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z',
		];
		alfaArr = alfaArr.map((element) => {
			return element.toUpperCase();
		});
		let all = [];
		// for (let index = 0; index < count; index++) {
		// // console.log(alfaArr);

		// }
		for (const iterator of alfaArr) {
			// console.log(iterator);
			all.push(iterator);
		}
		for (const iterator of alfaArr) {
			for (const key in alfaArr) {
				// console.log(key,iterator+alfaArr[key]);
				all.push(iterator + alfaArr[key]);
			}
		}
		// console.log(all);
		// console.log(all.length,count);

		// console.log(all.splice(0,count))

		this.alfaArray = all.splice(0, count);
		//  console.log(this.alfaArray);
	}
	// setvalue(value: any, e: any, item: any) {
	// 	console.log(value);
	// 	console.log(e);
	// 	console.log(item);
	// 	let domyItem = item;

	// 	// console.log(e.path[0].value);
	// 	if (e?.detail && e.detail.value) {
	// 		if (value.value != e.detail.value) {
	// 			value.value = e.detail.value;
	// 			console.log(e.detail.value);
	// 		}
	// 	} else {
	// 		if (value.value != e.path[0].value) {
	// 			value.value = e.path[0].value;
	// 			console.log(e.path[0].value);
	// 		}
	// 	}
	// 	console.log(domyItem);
	// 	console.log(
	// 		domyItem.find((item: any) => {
	// 			return item[0].en_name == value.en_name;
	// 		})[0]
	// 	);
	// 	domyItem.find((item: any) => {
	// 		return item[0].en_name == value.en_name;
	// 	})[0].value = value.value;
	// 	console.log(domyItem);

	// 	if (
	// 		this.outputData.find((item: any) => {
	// 			return item == domyItem;
	// 		})
	// 	) {
	// 		console.log(
	// 			this.outputData.find((item: any) => {
	// 				return item == domyItem;
	// 			})
	// 		);
	// 		// this.outputData.find((item:any)=>{return item==domyItem}).value=value.value
	// 	} else {
	// 		this.outputData.push(domyItem);
	// 	}
	// 	console.log(this.outputData);
	// }

 async	clac(item:FormGroup){
		if (
			item.controls.business_employee_id.value&&
			item.controls.contract_id.value &&
			// item.controls.working_shift_id.value&&
			item.controls.working_hour_count.value&&
			item.controls.insurance_day_count.value&&
			item.controls.insurance_wage.value&&
			this.month&&
			this.year
			
			) {
				await this.global.showLoading()
				this.global.httpPost('payroll/calculatePrices',
				{
					contract_id : item.controls.contract_id.value,
					business_employee_id : item.controls.business_employee_id.value,        
					year : this.year,
					month : this.month,    
					working_shift_id : item.controls.working_shift_id.value,
					insurance_day_count : item.controls.insurance_day_count.value,
					insurance_wage : item.controls.insurance_wage.value,
					working_hour_count : item.controls.working_hour_count.value,
					working_deficit_hours : item.controls.working_deficit_hours.value,
					working_friday_hour_count :item.controls.working_friday_hour_count.value ,    
					outstation_day_count :item.controls.outstation_day_count.value ,    
					working_night_hour_count : item.controls.working_night_hour_count.value,
					working_over_time_hour_count :  item.controls.working_over_time_hour_count.value   
				}
				).subscribe(
					async (res:any) => {
						await this.global.dismisLoading()
						console.log(res);
						item.patchValue(res)

					},
					async (error:any) => {
						await this.global.dismisLoading()
						this.global.showError(error)
					}
				)

				
			
		}

	}
	checkAll(i:number){

		if (i==0) {
			// console.log(e);
			this.excelForm.value.excelCell.map((item:any,index:string)=>{
				console.log(item.isWant);
				
				if (index) {
					
					// console.log(this.excelForm.value.excelCell[0].isWant);
					// item.isWant=this.excelForm.value.excelCell[0].isWant
					document.getElementById(index).click()
					// console.log(	);
					
					
				}
			})
			console.log(	this.excelForm.value.excelCell);
		}
	}

async	submit() {
		// console.log(this.excelForm.value.excelCell[0].isWant);
		let domyList:any[]=[]
		this.excelForm.value.excelCell.shift()
	console.log(this.excelForm.value.excelCell);
	this.excelForm.value.excelCell.map((item:any)=>{
		console.log(item.isWant);
		if (item.isWant) {
			domyList.push(item)
		}
	})

	console.log(domyList);
	if (domyList&&domyList.length) {
		this.Data.emit(domyList);
		
	}else{
		this.excelForm.value.excelCell.unshift(this.excelBaceColumnsTitle)
		this.global.showToast('لطفا حداقل یک کارمند را انتخاب کنید',800,'top','danger','ios')
	}
	
		// this.excelForm.reset()
			// this.allDataInpu = [this.excelBaceColumnsTitle];
			
	}
}
