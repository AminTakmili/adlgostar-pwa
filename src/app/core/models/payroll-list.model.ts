import { map } from 'rxjs/operators';
import { contract } from './contractConstant.model';
import { Deserializable } from './deserializable.model';

export class payrollList implements Deserializable {
    id!: number
    contract_id: number
    business_employee_id!: number
    payroll_received!: number
    sum_payroll_deductions!: number
    sum_payroll_additions!: number
    year!: number
    month!: number
    is_confirmed!: number
    // contract_info!: contract
    full_name:string
    business_name:string
    createdAt: string
    payment_date: string
    createdAtEn: string
    payroll_deductions!:object
    payroll_additions!:object
   
 

	deserialize(input: any): this {
		Object.assign(this, input);
        // if (input.contract_info) {
        //     this.contract_info=new contract().deserialize(input.contract_info) 
        // }
		return this;
	}
}

export class payrollInfo implements Deserializable {
   
    year!: number
    month!: number
    count!: number
    sum_payroll_received!: number
    list_confirmed!: boolean
   
 

	deserialize(input: any): this {
		Object.assign(this, input);
      
		return this;
	}
}
export class payrolDetail implements Deserializable {
   
    year!: number
    month!: number
    count!: number
    sum_payroll_received!: number
    list_confirmed!: boolean


    
        id: number;
        contract_id: number;
        business_employee_id: number;
        business_name:string;
        card_number: number;
        iban_number: number;
        account_number: number;
        employee_id: number;
        employee_gender: string;
        full_name: string;
        working_shift_id: number;
        working_day_count: number;
        working_hour_count: number;
        addition_hour_friday_or_holiday: number;
        sum_working_hours: number;
        daily_or_hourly_wage: number;
        monthly_wage: number;
        grocery_allowance: number;
        housing_allowance: number;
        children_allowance: number;
        severance_pay: number;
        new_year_gift: number;
        bonus: number;
        working_over_time_hour_count: number;
        working_over_time_price: number;
        working_night_hour_count: number;
        working_night_price: number;
        working_friday_hour_count: number;
        working_friday_price: number;
        unused_leave_amount: number;
        unused_leave:number;
        used_leave: number;
        operation_bonus: number;
        outstation_day_count: number;
        outstation_allowance_price: number;
        working_shift_price: 208987.00;
        remaining_cumulative_leave:number;
        commission: number;
        car_fuel: number;
        attract_allowance: number;
        trust_allowance: number;
        hardship_allowance: number;
        transportation_price: number;
        loan_received_amount: number;
        sum_payroll_additions: number;
        insurance_day_count: number;
        insurance_wage: number;
        insurance_allowance: number;
        employer_insurance_allowance:number;
        payroll_tax: number;
        working_deficit_hours: number;
        working_deficit_amount: number;
        loan_installment_amount: number;
        advance_money: number;
        purchase_invoice_from_company: number;
        food_cost: number;
        pension_cost: number;
        delay_penalty: number;
        absence_penalty: number;
        fund_reserve: number;
        fund_reserve_yearly_repay: number;
        sum_payroll_deductions: number;
        payroll_received:number;
        payment_date: string;
        inverse_payroll_received: number;
        sum_over_night_friday_amounts:number;
        without_pay_leave:number;
        without_pay_leave_amount:number
        custom_deductions:Array<custom>
        custom_additions:Array<custom>
    
   
 

	deserialize(input: any): this {
        console.log(this);
        console.log(  input);

        for (const key in input) {
           if ((typeof input[key])=='string'&&key!='payment_date'&&key!='full_name'&&key!='employee_gender'&&key!='business_name') {
            input[key]=Number(input[key])
           }
        }
       
        Object.assign(this, input);

		return this;
	}
}
interface custom{
    readonly   name:string,
    readonly    amount:string

}

