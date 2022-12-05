
import { Deserializable } from "./deserializable.model";

export class  reportLoan implements Deserializable {
	sum_loan_amount !: number ;
	month !: number ;
	year !: number ;
	business_name !: string;
	employee_name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class  reportLeave implements Deserializable {
	amount !: number ;
	month !: number ;
	year !: number ;
	business_name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class  reportNewYearGiftAndBonusList implements Deserializable {
	month !: number ;
	new_year_gift_amount !: number ;
	bonus_amount !: number ;
	year !: number ;
	business_name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class  reportPayroll implements Deserializable {
	month !: number ;
	year !: number ;
	business_name !: string;
	
	monthly_wage: number;
	grocery_allowance: number;
	housing_allowance: number;
	children_allowance: number;
	severance_pay: number;
	new_year_gift: number;
	bonus: number;
	working_over_time_price: number;
	working_friday_price: number;
	working_night_price: number;
	unused_leave_amount: number;
	operation_bonus: number;
	outstation_allowance_price: number;
	working_shift_price: number;
	commission: number;
	car_fuel: number;
	attract_allowance: number;
	trust_allowance: number;
	hardship_allowance: number;
	transportation_price: number;
	insurance_allowance: number;
	payroll_tax: number;
	advance_money: number;
	loan_installment_amount: number;
	food_cost: number;
	pension_cost: number;
	purchase_invoice_from_company: number;
	fund_reserve: number;
	working_deficit_amount: number;
	without_pay_leave_amount: number;
	detailObject:Array< detailObjectPayroll>
	
	deserialize(input: any): this {
		// console.log(this);
		// console.log(reportPayroll);
		
		this.detailObject=[
			{
				enName:'monthly_wage',
				faName:' درامد ماهیانه ',
				amount:input.monthly_wage?input.monthly_wage:0

			},
			{
				enName:'grocery_allowance',
				faName:' حق خواربار ',
				amount:input.grocery_allowance?input.grocery_allowance:0

			},
			{
				enName:'housing_allowance',
				faName:' حق مسکن ',
				amount:input.housing_allowance?input.housing_allowance:0

			},
			{
				enName:'children_allowance',
				faName:' حق اولاد ',
				amount:input.children_allowance?input.children_allowance:0

			},
			{
				enName:'severance_pay',
				faName:' سنوات',
				amount:input.severance_pay?input.severance_pay:0

			},
			{
				enName:'new_year_gift',
				faName:' عیدی ',
				amount:input.new_year_gift?input.new_year_gift:0

			},
			{
				enName:'bonus',
				faName:' پاداش ',
				amount:input.bonus?input.bonus:0

			},
			{
				enName:'working_over_time_price',
				faName:' مبلغ اضافه کاری ',
				amount:input.working_over_time_price?input.working_over_time_price:0

			},
			{
				enName:'working_friday_price',
				faName:' مبلغ جمعه کاری ',
				amount:input.working_friday_price?input.working_friday_price:0

			},
			{
				enName:'working_night_price',
				faName:' مبلغ شب کاری ',
				amount:input.working_night_price?input.working_night_price:0

			},
			{
				enName:'unused_leave_amount',
				faName:' مبلغ مرخصی استفاده نشده ',
				amount:input.unused_leave_amount?input.unused_leave_amount:0

			},
			{
				enName:'operation_bonus',
				faName:' پاداش عملکرد ',
				amount:input.operation_bonus?input.operation_bonus:0

			},
			{
				enName:'outstation_allowance_price',
				faName:' حق ماموریت ',
				amount:input.outstation_allowance_price?input.outstation_allowance_price:0

			},
			{
				enName:'working_shift_price',
				faName:' مبلغ شیفت ',
				amount:input.working_shift_price?input.working_shift_price:0

			},
			{
				enName:'commission',
				faName:' پورسانت ',
				amount:input.commission?input.commission:0

			},
			{
				enName:'car_fuel',
				faName:' حق سوخت ',
				amount:input.car_fuel?input.car_fuel:0

			},
			{
				enName:'attract_allowance',
				faName:' حق جذب ',
				amount:input.attract_allowance?input.attract_allowance:0

			},
			{
				enName:'trust_allowance',
				faName:' حق مسئولیت ',
				amount:input.trust_allowance?input.trust_allowance:0

			},
			{
				enName:'hardship_allowance',
				faName:' حق سختی کار ',
				amount:input.hardship_allowance?input.hardship_allowance:0

			},
			{
				enName:'transportation_price',
				faName:' هزینه حمل و نقل ',
				amount:input.transportation_price?input.transportation_price:0

			},
			
			{
				enName:'insurance_allowance',
				faName:' حق بیمه',
				amount:input.insurance_allowance?input.insurance_allowance:0

			},
			
			{
				enName:'payroll_tax',
				faName:' مالیات بر حقوق',
				amount:input.payroll_tax?input.payroll_tax:0

			},
			
			{
				enName:'advance_money',
				faName:' مساعده',
				amount:input.advance_money?input.advance_money:0

			},
			{
				enName:'loan_installment_amount',
				faName:' اقساط وام',
				amount:input.loan_installment_amount?input.loan_installment_amount:0

			},
			{
				enName:'food_cost',
				faName:' هزینه غذا',
				amount:input.food_cost?input.food_cost:0

			},
			{
				enName:'pension_cost',
				faName:' هزینه پانسیون',
				amount:input.pension_cost?input.pension_cost:0

			},
			{
				enName:'purchase_invoice_from_company',
				faName:' خرید از شرکت',
				amount:input.purchase_invoice_from_company?input.purchase_invoice_from_company:0

			},
			{
				enName:'fund_reserve',
				faName:' ذخیره صندوق',
				amount:input.fund_reserve?input.fund_reserve:0

			},
			{
				enName:'working_deficit_amount',
				faName:' مقدار کسری کار',
				amount:input.working_deficit_amount?input.working_deficit_amount:0

			},
			{
				enName:'without_pay_leave_amount',
				faName:' مرخصی بدون حقوق',
				amount:input.without_pay_leave_amount?input.without_pay_leave_amount:0

			},
			
		]
		Object.assign(this, input);
		return this;
	}
}
interface detailObjectPayroll {
	enName:string,
	faName:string,
	amount:number
}