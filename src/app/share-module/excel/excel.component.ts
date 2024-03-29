import { async } from '@angular/core/testing';
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
	// form: FormGroup[]=[];
	excelCell: FormArray;
	custom_additions: FormArray[] = [];
	default_custom_additions:Array<object> = [];
	custom_deductions: FormArray[] = [];
	default_custom_deductions:Array<object> = [];
	alfaArray: any;

	excelBaceColumnsTitle: any = {
		is_inverse: 'محاسبه معکوس',
		calc:'عملگر',
		has_working_over_time:'ساعت اضافه کار دارد؟',
		has_working_friday:'ساعت جمعه کار دارد؟',
		has_working_night:'ساعت شب کار دارد؟',
		employee_id: 'کد کارمند',

		full_name: 'نام کارمند',

		working_shift_id: 'شیفت کاری',

		working_day_count:  ' تعداد روز کارکرد ( اضافات )',

		working_hour_count: ' ساعت کارکرد( اضافات )',

		addition_hour_friday_or_holiday: ' ساعت تعطیل و جمعه کاری ( اضافات ) ',

		sum_working_hours: 'جمع کل ساعت کار  (اضافات)  ',

		daily_or_hourly_wage: 'حقوق ثابت   ',
		monthly_wage: '  حقوق ماهانه ',

		grocery_allowance: '  حق بن( اضافات )',

		housing_allowance: ' حق مسکن ( اضافات )',

		children_allowance: '  حق اولاد ( اضافات )',

		severance_pay: '  حق سنوات ( اضافات )',

		new_year_gift: '  عیدی ( اضافات )',

		bonus: '  پاداش( اضافات )',

		working_over_time_hour_count: '  ساعت اضافه کاری( اضافات )',

		working_over_time_price: ' مبلغ اضافه کاری( اضافات ) ',

		working_friday_hour_count: '  ساعت جمعه کاری( اضافات )',

		working_friday_price: ' مبلغ جمعه کاری ( اضافات )',

		working_night_hour_count: '  ساعت شب کاری( اضافات )',

		working_night_price: ' مبلغ شب کاری ( اضافات )',

		unused_leave_amount: '  مبلغ مرخصی استفاده نشده( اضافات )',

		unused_leave: '  تعداد مرخصی استفاده نشده ( اضافات )',

		used_leave: '  تعداد مرخصی استفاده شده ( اضافات )',

		operation_bonus: '  پاداش عملکرد ( اضافات )',

		// اضافات اکسل

		outstation_day_count: ' تعداد روز ماموریت ( اضافات )',

		outstation_allowance_price: '  مبلغ حق ماموریت( اضافات )',

		working_shift_price: ' مبلغ شیفت کاری ( اضافات )',

		remaining_cumulative_leave: ' مانده مرخصی تجمیعی ( اضافات )',

		commission: ' پورسانت ( اضافات )',

		car_fuel: ' هزینه سوخت خودرو ( اضافات )',

		attract_allowance: ' حق جذب ( اضافات )',

		trust_allowance: ' حق مسئولیت ( اضافات )',

		hardship_allowance: ' حق سختی کار  ( اضافات )',

		transportation_price: '  هزینه ایاب و ذهاب( اضافات )',

		loan_received_amount: '  مبلغ وام دریافتی( اضافات )',

		sum_payroll_additions: 'جمع اضافات',

		insurance_day_count: '  تعداد روز بیمه ( کسورات )',

		insurance_wage: '   مبلغ دستمزد روزانه حق بیمه( کسورات )',

		insurance_allowance: '   7% حق بیمه( کسورات )',

		employer_insurance_allowance: 'حق بیمه سهم کارفرما',

		payroll_tax: ' مالیات بر حقوق  ( کسورات )',

		working_deficit_hours: '  ساعت کسری کار ( کسورات )',

		working_deficit_amount: '   مقدار کسری کار ( کسورات )',
		working_deficit_rate: '   نرخ کسری کار ( کسورات )',

		loan_installment_amount: '   کسر قسط وام ( کسورات )',

		advance_money: '   کسر مساعده( کسورات )',

		purchase_invoice_from_company: ' خرید از شرکت ( کسورات ) ',

		food_cost: ' هزینه استفاده از غذای پرسنلی  ( کسورات ) ',

		pension_cost: '  هزینه اجاره پانسیون ( کسورات ) ',

		//  اضافه اکسل

		// delay_penalty: 'جریمه تاخیر',

		// absence_penalty: 'جریمه غیبت',

		fund_reserve: ' ذخیره صندوق ( کسورات ) ',

		fund_reserve_yearly_repay: 'بازپرداخت ذخیره صندوق سالیانه',

		sum_payroll_deductions: 'جمع کسورات',

		payroll_received: 'خالص دریافتی',

		payment_date: 'تاریخ واریز حقوق',

		inverse_payroll_received: 'مبلغ حقوق خالص معکوس',

		// sum_over_night_friday_amounts: 'اضافه کاری و شبکاری و جمعه کاری',

		without_pay_leave: 'تعداد مرخصی بدون حقوق',

		without_pay_leave_amount: 'مبلغ مرخصی بدون حقوق',
		without_pay_cumulative_leave: 'مرخصی بدون حقوق تجمیعی',
		work_hours_in_day : 'مجموع ساعات کار در روز',
		work_hours_in_night  : 'مجموع ساعات کار در شب',
		calc_unused_leave_monthly: ' مرخصی استفاده نشده محاسبه میشود؟',
		working_hour_mentioned_in_contract: ' ساعت کارکرد در قرارداد ذکر شده؟ ',
		calc_payroll_tax: 'مالیات محاسبه میشود؟',
		is_hourly_contract:'نوع قرارداد '
	};

	calcparametr: string[] = [
		// 'working_day_count',
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
		'working_deficit_rate',
		'fund_reserve_yearly_repay',
	];
	workingShiftsList: DataSets[];

	allDataInpu: any;
	typeColumn: string;
	titleColumn: string;
	AdditionsArray:Array<any> =[]
	wantLoade:boolean=false
	// outputData: any = [];

	// isClacing=false
	// isClacingInverse=false
	// perStateIsInverse:boolean|undefined=undefined
	constructor(private fb: FormBuilder, private global: GlobalService,		
		) {}
	

	async ngOnInit() {
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.workingShiftsList = value.working_shifts;
				// console.log(this.workingShiftsList);
			}
		});
	}
	async ngOnChanges(changes: SimpleChanges) {

		this.excelForm = this.fb.group({
			excelCell: this.fb.array([]),
		});
		this.excelCell = this.excelForm.get('excelCell') as FormArray;
		// console.log(this.excelForm.controls);
		// console.log(this.excelCell);
		if (
			this.excelCellGroup.controls &&
			this.excelCellGroup.controls.length
		) {
			// for (let index =1; index <=this.excelCellGroup.controls.length; index++) {
			// 	console.log(this.excelCellGroup.controls[index]);
			// 	// console.log(this.excelCell.controls[index]);
			// 	this.excelCell.removeAt(index)
			// }
			// this.excelForm.reset()
		}
		// console.log(this.excelCell);
		this.allDataInpu = [];

		// console.log(changes);
		this.allDataInpu = [
			this.excelBaceColumnsTitle,
			...changes?.list?.currentValue,
		];
		// this.outputData = this.allDataInpu;
		// console.log(changes.list.currentValue);

		console.log(this.allDataInpu);
		this.gridRows = this.allDataInpu.length;
		// * +1 for checkbox

		this.gridColumns = Object.keys(this.allDataInpu[0]).length + 1;
		// console.log(this.gridColumns,this.gridRows);
		this.creatAlfab(this.gridColumns);
		// this.gridColumns=Object.keys(this.excelBaceColumnsTitle).length;
		// console.log(this.gridRows, this.gridColumns);
		this.allDataInpu.map((item: any) => {
			this.excelCell.push(this.newexcelCell(item));
			// console.log(item);
			if(item.custom_additions&&item.custom_additions.length){
				// console.log(item.custom_additions);
				item.custom_additions.map((addition:any)=>{
					
					if (!this.default_custom_additions.find((item:any)=>{return item.name==addition.name})) {
						this.default_custom_additions.push(addition)
						
					}
					
					
				})
			

			}
			if(item.custom_deductions&&item.custom_deductions.length){
				// console.log(item.custom_additions);
			
				item.custom_deductions.map((deduction:any)=>{
					// console.log("object");
					// console.log(deduction);
					if (!this.default_custom_deductions.find((item:any)=>{return item.name==deduction.name})) {
						this.default_custom_deductions.push(deduction)
						
					}
					
					
				})

			}

		});
		console.log(	this.default_custom_additions,	this.default_custom_deductions);
		// console.log(this.excelCell);
		if (this.default_custom_additions) {
			this.default_custom_additions.map((item:any)=>{
			
				// console.log(item);
			this.gridColumns++
				this.creatAlfab(this.gridColumns);

				// console.log(this.custom_additions);
				this.custom_additions.map(async(custom_addition: any, index: number) => {
				var amountInAllDataInpu=await	this.allDataInpu.find((findItem:any,indexItem:number)=>{
						
						if (indexItem==index) {
							return findItem?.custom_additions?.find((findAdditionItem:any)=>{
								console.log(findAdditionItem.amount);
								return (findAdditionItem.name==item.name)
							})?.amount
							
							
						}else{
							return false
						}
					})
					console.log(amountInAllDataInpu);
					var amount= await amountInAllDataInpu?.custom_additions?.find((amountItem:any)=>{return amountItem.name==item.name})?.amount
					console.log(amount);
					custom_addition.push(
						this.newCustomAdditions({
							amount: amount?amount:0,
							name: item.name,
							index: index,
						})
					);
					
					this.typeColumn = null;
					this.titleColumn = null;
				});


			})
		}
		if (this.default_custom_deductions) {
			this.default_custom_deductions.map((item:any)=>{
			
				// console.log(item);
			this.gridColumns++
				this.creatAlfab(this.gridColumns);

				// console.log(this.custom_deductions);
				this.custom_deductions.map(async(custom_addition: any, index: number) => {
				var amountInAllDataInpu=await	this.allDataInpu.find((findItem:any,indexItem:number)=>{
						
						if (indexItem==index) {
							return findItem?.custom_deductions?.find((findAdditionItem:any)=>{
								console.log(findAdditionItem.amount);
								return (findAdditionItem.name==item.name)
							})?.amount
							
							
						}else{
							return false
						}
					})
					console.log(amountInAllDataInpu);
					var amount= await amountInAllDataInpu?.custom_deductions?.find((amountItem:any)=>{return amountItem.name==item.name})?.amount
					console.log(amount);
					custom_addition.push(
						this.newCustomDeductions({
							amount: amount?amount:0,
							name: item.name,
							index: index,
						})
					);
					
					this.typeColumn = null;
					this.titleColumn = null;
				});


			})
		}
		


	}
	// onScroll(event:Event){
	// 	console.log(event.srcElement);
	// }

	

	//! coment html
	// setCellClickValue(e: any) {
	// 	this.cellClickValue = e.path[0].value;
	// 	// console.log(e.path[0].value);
	// 	if (e.detail.value) {
	// 		this.cellClickValue = e.detail.value;
	// 		// console.log(e.detail.value);
	// 	}
	// }

	/* ============================== All form arrays ===========================================*/
	get excelCellGroup(): FormArray {
		return this.excelForm.get('excelCell') as FormArray;
	}

	 newexcelCell(employee: any): FormGroup {
		//  this.setAdditionsArray()
		console.log(employee);
		console.log(	this.AdditionsArray);
		// console.log(employee, employee.employee_id);
		let forme = this.fb.group({
			isWant: [true],
			is_inverse: [employee.is_inverse?employee.is_inverse:false],
			calc: [employee.calc?employee.calc:'محاسبه'],

			has_working_over_time: [employee.has_working_over_time?employee.has_working_over_time:0],
			has_working_friday: [employee.has_working_friday?employee.has_working_friday:0],
			has_working_night: [employee.has_working_night?employee.has_working_night:0],
			id: [employee.id],
			contract_id: [employee.contract_id],
			business_employee_id: [employee.business_employee_id],
			employee_id: [employee.employee_id],
			full_name: [employee.full_name],
			working_shift_id: [
				employee.working_shift_id ? employee.working_shift_id : ' ',
			],
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
			working_deficit_rate: [employee.working_deficit_rate],
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
			// sum_over_night_friday_amounts: [
			// 	employee.sum_over_night_friday_amounts,
			// ],
			without_pay_leave: [employee.without_pay_leave],
			without_pay_leave_amount: [employee.without_pay_leave_amount],
			without_pay_cumulative_leave: [employee.without_pay_cumulative_leave],
			work_hours_in_day : [employee.work_hours_in_day ],
			work_hours_in_night : [employee.work_hours_in_night ],
			calc_unused_leave_monthly: [
				employee.calc_unused_leave_monthly == 0
					? 'خیر'
					: employee.calc_unused_leave_monthly == 1
					? 'بله'
					: employee.calc_unused_leave_monthly,
			],
			working_hour_mentioned_in_contract: [
				employee.working_hour_mentioned_in_contract == 0
					? 'خیر'
					: employee.working_hour_mentioned_in_contract == 1
					? 'بله'
					: employee.working_hour_mentioned_in_contract,
			],
			// calc_unused_leave_monthly: [employee.calc_unused_leave_monthly?employee.calc_unused_leave_monthly:0],

			calc_payroll_tax: [
				employee.calc_payroll_tax == 0
					? 'خیر'
					: employee.calc_payroll_tax == 1
					? 'بله'
					: employee.calc_payroll_tax,
			],
			is_hourly_contract: [
				employee.is_hourly_contract == 0
					? 'تمام وقت'
					: employee.is_hourly_contract == 1
					? 'ساعتی'
					: employee.is_hourly_contract,
			],
			// calc_payroll_tax: [employee.calc_payroll_tax==0?'خیر':'بله'],
			custom_additions: this.fb.array([]),
			custom_deductions: this.fb.array([]),
		});
		// console.log(forme.get('custom_additions'));
		// console.log(this.excelCellGroup);
		this.custom_additions.push(forme.get('custom_additions') as FormArray);
		this.custom_deductions.push(
			forme.get('custom_deductions') as FormArray
		);
		// console.log(this.custom_additions, this.custom_deductions);
		// this.custom_additions = this.excelForm.get('custom_additions') as FormArray;
		// this.custom_deductions = this.excelForm.get('custom_deductions') as FormArray;
		// this.form.push(forme)
		if (this.AdditionsArray.length) {
			console.log("object");
		}

		return forme;
	}
	get customAdditions(): FormArray[] {
		let domy: FormArray[] = [];
		this.excelCellGroup.controls.map((item) => {
			domy.push(item.get('custom_additions') as FormArray);
		});
		return domy;
	}
	// {name:string,amount:number|null,index?:number}
	newCustomAdditions(addition?: any): FormGroup {
		// Validators.compose([Validators.required])
		return this.fb.group({
			name: [addition?.name],
			amount: [addition?.index == 0 ? addition?.name : addition?.amount],
		});
	}
	newCustomDeductions(deductions?: any): FormGroup {
		// Validators.compose([Validators.required])
		return this.fb.group({
			name: [deductions?.name],
			amount: [
				deductions?.index == 0 ? deductions?.name : deductions?.amount,
			],
		});
	}
	/* ==============================  form arrays ===========================================*/

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

	// setAdditionsArray(){
	// 	this.global.httpPost('payrollAddition/filteredList',{limit:9999,offset:0}).subscribe(
	// 		async (res:any) => {
	// 			console.log(res.list);
	// 			console.log(this.excelBaceColumnsTitle);
	// 			res.list.map((addition:any)=>{
	// 				this.AdditionsArray.push(addition)
	// 				// console.log(this.excelCellGroup.get(addition.en_name));
	// 				// console.log(addition.en_name);
	// 				// console.log(this.excelBaceColumnsTitle[addition.en_name]);
	// 				// this.excelBaceColumnsTitle[addition.en_name]=this.excelBaceColumnsTitle[addition.en_name]+' (اضافات)'

	// 			})
	// 		},
	// 		async (error:any) => {
				
	// 		}
	// 		)
	// 		console.log(this.excelBaceColumnsTitle);
	// }

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

	addColumn() {
		// console.log(this.custom_additions);
		// console.log(this.form);
		// console.log(this.customAdditions);
		// console.log(this.excelCellGroup);
		// console.log(this.typeColumn,this.titleColumn);
		let domy = this.titleColumn;
		if (this.titleColumn) {
			if (this.typeColumn == 'custom_additions') {
				// console.log('object');
				this.gridColumns++
				this.creatAlfab(this.gridColumns);

				this.custom_additions.map((item: any, index: number) => {
					item.push(
						this.newCustomAdditions({
							amount: '',
							name: domy,
							index: index,
						})
					);
					// console.log(item);
					// console.log(this.gridColumns);
					// this.gridColumns++
					// console.log(
					// 	this.custom_additions[0]?.value?.length +
					// 		this.custom_deductions[0]?.value?.length
					// );
					// console.log(
					// 	this.custom_additions[0]?.value?.length,
					// 	this.custom_deductions[0]?.value?.length
					// );
					// this.creatAlfab(this.gridColumns-this.custom_additions[0]?.value?.length*2);
					// this.creatAlfab(this.gridColumns-((this.custom_additions[0]?.value?.length+this.custom_deductions[0]?.value?.length)*2));

					this.typeColumn = null;
					this.titleColumn = null;
				});
			} else if (this.typeColumn == 'custom_deductions') {
				this.gridColumns++;

				this.creatAlfab( this.gridColumns);
					// -
					// 	(this.custom_additions[0]?.value?.length +
					// 		this.custom_deductions[0]?.value?.length) *
					// 		2

				this.custom_deductions.map((item: any, index: number) => {
					item.push(
						this.newCustomDeductions({
							amount: '',
							name: domy,
							index: index,
						})
					);
					// console.log(item);
					// this.gridColumns++
					// this.creatAlfab(this.gridColumns-2);
					// this.gridColumns++

					// this.creatAlfab(this.gridColumns-((this.custom_additions[0]?.value?.length+this.custom_deductions[0]?.value?.length)*2));

					this.typeColumn = null;
					this.titleColumn = null;
				});
			} else {
				this.global.showToast(
					'لطفا نوع را انتخاب کنید',
					900,
					'top',
					'danger',
					'ios'
				);
			}
		} else {
			this.global.showToast(
				'لطفا عنوان را بنویسید',
				900,
				'top',
				'danger',
				'ios'
			);
		}
	}
	

	async clac(item: FormGroup,isInverse=false) {
		// console.log(item);
		// console.log(item.value);
		// !(item.controls.inverse_payroll_received.value) &&
		// item.controls.working_hour_count.value &&
		// item.controls.insurance_day_count.value &&
		// item.controls.insurance_wage.value &&
		// console.log("object");
		//* event is change whant this if
		// console.log(isInverse||(!this.perStateIsInverse&&!(item.controls.is_inverse.value=='true')));
		// if (isInverse||(!this.perStateIsInverse&&!(item.controls.is_inverse.value=='true'))) {
			console.log(item.controls?.is_inverse?.value);
			console.log(item.controls?.is_inverse?.value=='false');
			console.log(item.controls?.is_inverse?.value=='false'||item.controls?.is_inverse?.value==false);
			if (
				(item.controls?.is_inverse?.value=='false'||item.controls?.is_inverse?.value==false)&&
				item.controls.business_employee_id.value &&
				item.controls.contract_id.value &&
				// item.controls.working_shift_id.value&&
				this.month &&
				this.year
			) {
				await this.global.showLoading();
				this.global
					.httpPost('payroll/calculatePrices', {
						contract_id: item.controls.contract_id.value,
						business_employee_id:
							item.controls.business_employee_id.value,
						year: this.year,
						month: this.month,
						working_shift_id: item.controls.working_shift_id.value,
						working_day_count: item.controls.working_day_count.value,

						insurance_day_count:
							item.controls.insurance_day_count.value,
						insurance_wage: item.controls.insurance_wage.value,
						working_hour_count: item.controls.working_hour_count.value,
						working_deficit_hours:
							item.controls.working_deficit_hours.value,
						working_friday_hour_count:
							item.controls.working_friday_hour_count.value,
						operation_bonus:
							item.controls.operation_bonus.value,
						commission:
							item.controls.commission.value,
						car_fuel:
							item.controls.car_fuel.value,
						transportation_price:
							item.controls.transportation_price.value,
						fund_reserve:
							item.controls.fund_reserve.value,
						advance_money:
							item.controls.advance_money.value,
						purchase_invoice_from_company:
							item.controls.purchase_invoice_from_company.value,
						outstation_day_count:
							item.controls.outstation_day_count.value,
						working_night_hour_count:
							item.controls.working_night_hour_count.value,
						working_over_time_hour_count:
							item.controls.working_over_time_hour_count.value,
						custom_additions: item.controls.custom_additions.value,
						custom_deductions: item.controls.custom_deductions.value,
					})
					.subscribe(
						async (res: any) => {
							await this.global.dismisLoading();
							// console.log(res);
							item.patchValue(res);
						},
						async (error: any) => {
							await this.global.dismisLoading();
							this.global.showError(error);
						}
					);
			}
			// else{
			// 	if (!item.controls.working_hour_count.value) {
			// 		this.global.showToast('لطفا ساعت کارکرد را وارد کنید',750,'top','danger')
			// 	}
			// 	if (!item.controls.insurance_day_count.value) {
			// 		this.global.showToast('لطفا ساعت بیمه را وارد کنید',750,'top','danger')
			// 	}
	
			// }
		// }
	}

	async clacInverse(item: FormGroup,isInverseButton=false) {
		console.log("object");
		// this.perStateIsInverse=!(item.controls.is_inverse.value=='true')
		let calc_unused_leave_monthly=item.controls.calc_unused_leave_monthly.value == 'خیر'
		? 0
		: item.controls.calc_unused_leave_monthly.value == 'بله'
		? 1
		: item.controls.calc_unused_leave_monthly.value
		// console.log(calc_unused_leave_monthly);

		// console.log((item.controls.is_inverse.value));
		// console.log(Boolean(item.controls.is_inverse.value));
		//? item.controls.calc_unused_leave_monthly.value&&
		if (
			(item.controls.is_inverse.value=='true'||item.controls.is_inverse.value==true)  &&
			item.controls.business_employee_id.value &&
			item.controls.contract_id.value &&
			// item.controls.working_shift_id.value&&
			
			// item.controls.working_day_count.value &&
			// item.controls.working_hour_count.value &&
			item.controls.inverse_payroll_received.value &&
		
			this.month &&
			this.year
		) {
			console.log("object");
			await this.global.showLoading();
			this.global
				.httpPost('payroll/inverseCalculatePrices', {
					contract_id: item.controls.contract_id.value,
					business_employee_id:
						item.controls.business_employee_id.value,
					year: this.year,
					month: this.month,
					working_day_count: item.controls.working_day_count.value,
					
					working_hour_count: item.controls.working_hour_count.value,
					has_working_over_time:
						item.controls.has_working_over_time.value,
					has_working_friday:
						item.controls.has_working_friday.value,
					has_working_night:
						item.controls.has_working_night.value,
						inverse_payroll_received:
							item.controls.inverse_payroll_received.value,
						calc_unused_leave_monthly,
					
					
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						console.log(res);
						item.patchValue(res);
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		} else if((item.controls.is_inverse.value!='true'||item.controls.is_inverse.value!=true)){
			// console.log(item);
			// console.log(item.value);
			// item.controls.inverse_payroll_received.setValue(0)
			if (isInverseButton) {
				
				this.clac(item,true)
			}
		}
		if(!item.controls.inverse_payroll_received.value&&(item.controls.is_inverse.value=='true'||(item.controls.is_inverse.value==true))){
			this.global.showToast( ' لطفا مبلغ حقوق خالص معکوس را وارد کنید ', 1000,'middle','danger','ios' )
		}
	}
	async resetDefaltData(item: FormGroup,index:number){
	
		if ((item.controls?.is_inverse?.value=='false'||item.controls?.is_inverse?.value==false)) {
			await this.global.showLoading()
			this.global.httpPost('payroll/getDefaultPayrollAmount',{
				contract_id: item.controls.contract_id.value,
				business_employee_id:
					item.controls.business_employee_id.value,
				year: this.year,
				month: this.month,
			}).subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					// console.log(res);
					item.patchValue(res);
					// if (res.calc_unused_leave_monthly) {
						
						item.get('calc_unused_leave_monthly').setValue(res.calc_unused_leave_monthly == 0
							? 'خیر'
							: res.calc_unused_leave_monthly == 1
							? 'بله'
							: res.calc_unused_leave_monthly)
					// }
					// if (res.working_hour_mentioned_in_contract) {
						item.get('working_hour_mentioned_in_contract').setValue(res.working_hour_mentioned_in_contract == 0
							? 'خیر'
							: res.working_hour_mentioned_in_contract == 1
							? 'بله'
							: res.working_hour_mentioned_in_contract)
					
						
					// }
					// if (res.calc_payroll_tax) {
						item.get('calc_payroll_tax').setValue(res.calc_payroll_tax == 0
							? 'خیر'
							: res.calc_payroll_tax == 1
							? 'بله'
							: res.calc_payroll_tax)
					
						
					// }
					// console.log(res);
					// if (res.is_hourly_contract) {
						console.log('is_hourly_contract');
						item.get('is_hourly_contract').setValue(res.is_hourly_contract == 0
							?  'تمام وقت'
							: res.is_hourly_contract == 1
							?'ساعتی'
							: res.is_hourly_contract)
					
						
					// }
				
					// calc_unused_leave_monthly: [employee.calc_unused_leave_monthly?employee.calc_unused_leave_monthly:0],
		
					
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
		}else{
				console.log(item.value);
				console.log(this.custom_additions,);
				console.log(this.custom_additions[index].controls,index);
				console.log(item.get('custom_additions'));
				// this.custom_additions[index].get('amount').setValue(null)
				this.custom_additions[index].controls.map((item)=>{
					item.get('amount').setValue(null)
				})
				this.custom_deductions[index].controls.map((item)=>{
					item.get('amount').setValue(null)
				})
				// item.get('custom_additions').get('amount').setValue(null)
				// item.get('custom_additions').controls
		}

	}

	checkAll(i: number) {
		if (i == 0) {
			// console.log(e);
			this.excelForm.value.excelCell.map((item: any, index: string) => {
				// console.log(item.isWant);

				if (index) {
					// console.log(this.excelForm.value.excelCell[0].isWant);
					// item.isWant=this.excelForm.value.excelCell[0].isWant
					document.getElementById(index).click();
					// console.log(	);
				}
			});
			// console.log(this.excelForm.value.excelCell);
		}
	}
	setAddition(addition: any, event: any, item: any) {
		// console.log(addition, addition.amount, event.detail.value);
		addition.amount = event?.detail?.value;
		// if (event?.detail?.value) {
		this.clac(item);
		// }
	}
	setDeduction(deductions: any, event: any, item: any) {
		// console.log(deductions, deductions.amount, event.detail.value);
		deductions.amount = event?.detail?.value;
		// if (event?.detail?.value) {
		this.clac(item);
		// }
	}
	deleteAdditionAlert(index: number, item: any) {
		// console.log(index);
		this.global
			.showAlert(
				'حذف ستون اضافات',
				`آیا برای حذف ستون اضافات با نام ${item.name} اطمینان دارید؟`,
				[
					{
						text: 'بلی',
						role: 'yes',
					},
					{
						text: 'خیر',
						role: 'cancel',
					},
				]
			)
			.then((alert: any) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						this.clac(item)
						this.deleteAddition(index,item);
					}
				});
			});
	}
	deleteAddition(index: number,itemAddition:any) {
		this.gridColumns--;

		// this.creatAlfab(this.gridColumns-this.custom_additions[0]?.value?.length*2);
		this.creatAlfab(
			this.gridColumns 
		);
		this.custom_additions.map( async(item: any) => {
			// item.push(this.newCustomAdditions({amount:'',name:domy,index:index}))
			// console.log(item);
			await item.removeAt(index);
			this.clac(itemAddition)
		});
	}
	deleteDeductionsAlert(index: number, item: any) {
		// console.log(index);
		this.global
			.showAlert(
				'حذف ستون کسورات',
				`آیا برای حذف ستون کسورات با نام ${item.name} اطمینان دارید؟`,
				[
					{
						text: 'بلی',
						role: 'yes',
					},
					{
						text: 'خیر',
						role: 'cancel',
					},
				]
			)
			.then((alert: any) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
					
						this.deleteDeductions(index,item);
					}
				});
			});
	}
	deleteDeductions(index: number,itemDeduction:any) {
		this.gridColumns--;
		this.creatAlfab(
			this.gridColumns
		);
		this.custom_deductions.map(async (item: any) => {
			// item.push(this.newCustomAdditions({amount:'',name:domy,index:index}))
			// console.log(item);
		await	item.removeAt(index);
		this.clac(itemDeduction)

			// this.creatAlfab(this.gridColumns-this.custom_additions[0]?.value?.length*2);
		});
	}

	async submit() {
		// console.log(this.custom_additions);
		// this.custom_additions[1].value.map((item: any) => {
		// 	console.log(item);
		// 	console.log(item.value);
		// });
		// console.log(this.excelForm.value);
		// console.log(this.excelForm.value.excelCell[0].isWant);
		let domyList: any[] = [];
		// this.excelForm.value.excelCell.shift();
		// console.log(this.excelForm.value.excelCell);
		this.excelForm.value.excelCell.map((item: any) => {
			// console.log(item.isWant);
			if (item.isWant) {
				domyList.push(item);
			}
		});

		domyList.shift() 
		console.log(domyList);
		if (domyList && domyList.length) {
			this.Data.emit(domyList);
		} else {
			// this.excelForm.value.excelCell.unshift(this.excelBaceColumnsTitle);
			this.global.showToast(
				'لطفا حداقل یک کارمند را انتخاب کنید',
				800,
				'top',
				'danger',
				'ios'
			);
		}

		// this.excelForm.reset()
		// this.allDataInpu = [this.excelBaceColumnsTitle];
	}
	//  explode() {
	// 	var particles = 15,
	// 	  // explosion container and its reference to be able to delete it on animation end
	// 	  explosion = '<div class="explosion"></div>';
	  
	// 	// put the explosion container into the body to be able to get it's size
	// 	document.getElementById('form').append(explosion);
	  
	// 	// position the container to be centered on click
	// 	// explosion.css('left', x - explosion.width() / 2);
	// 	// explosion.css('top', y - explosion.height() / 2);
	  
	// 	for (var i = 0; i < particles; i++) {
	// 	  // positioning x,y of the particle on the circle (little randomized radius)
	// 	//   var x = (explosion.width() / 2) + rand(80, 150) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10)),
	// 	// 	y = (explosion.height() / 2) + rand(80, 150) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
	// 	var	color = rand(0, 255) + ', ' + rand(0, 255) + ', ' + rand(0, 255), // randomize the color rgb
	// 		  // particle element creation (could be anything other than div)
	// 		elm = '<div class="particle" style="' +
	// 		  'background-color: rgb(' + color + ') ;' +
	// 		 '</div>';
	  
	// 	  if (i == 0) { // no need to add the listener on all generated elements
	// 		// css3 animation end detection
	// 		elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	// 		  explosion.remove(); // remove this explosion container when animation ended
	// 		});
	// 	  }
	// 	  explosion.append(elm);
	// 	}
	//   }
	  
	//   // get random number between min and max value
	//   function rand(min, max) {
	// 	return Math.floor(Math.random() * (max + 1)) + min;
	//   }
	trackByIndex(index:number, el:any): number {
		// console.log(index,el);
		return index;
	}
	trackByEmployeeId(index:number, el:any): number {
		
		return el.employee_id;
	  }
	  onScroll(e:Event){
		console.log(e);
		console.log(window.scroll());
		// console.log(e.scrollTop());
	  }
	  
}
