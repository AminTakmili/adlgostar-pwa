import { Deserializable } from './deserializable.model';

export class workingHourList implements Deserializable {
    id: number
    year: number
    month: number
    monthName: string
    count_day: number
    count_friday: number
    count_holiday: number
    count_working_day: number
    amount: number
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string
    loadingDownload!:boolean
	deserialize(input: any): this {
		Object.assign(this, input);
       this.loadingDownload=false
	
		return this;
	}
}

export class payrollTaxList implements Deserializable {
    id: number
    year: number
    from_amount: number
    to_amount: number
    percent: number 
    amount: number
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class payrollAdditiLonist implements Deserializable {
    id: number
    name: string
    en_name: string
    taxable: number
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string
    isRequired!:boolean


	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}


export class payrollDeductionLonist implements Deserializable {
    id: number
    name: string
    en_name: string
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string
    isRequired!:boolean
 

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}



export class payroll implements Deserializable {
  
    contract_id: number;
        business_employee_id: number;
        employee_id: number;
    
        full_name:string;
    
        working_shift_id: number;
    
        working_day_count: number; 
    
        working_hour_count: number;
    
        addition_hour_friday_or_holiday: number;  
    
        sum_working_hours: number; 
    
        daily_or_hourly_wage: number; 
    
        grocery_allowance: number; 
    
        housing_allowance: number; 
    
        children_allowance: number; 
    
        severance_pay: number; 
    
        new_year_gift: number; 
    
        bonus: number; 
    
        working_over_time_hour_count: number; 
    
        working_over_time_price: number; 
    
        working_friday_hour_count: number;
    
        working_friday_price: number;
    
        working_holiday_count: number; 
    
        working_holiday_price: number; 
    
        working_night_hour_count: number; 
    
        working_night_price: number; 
    
        unused_leave_amount: number; 
    
        unused_leave: number;  
    
        used_leave: number;  
    
        operation_bonus: number; 
    
        // اضافات اکسل
    
        outstation_day_count:   number; 
    
        outstation_allowance_price: number;  
    
        working_shift_price: number; 
    
        remaining_cumulative_leave: number;  
    
        commission: number; 
    
        car_fuel: number;  
    
        attract_allowance: number; 
    
        trust_allowance: number; 
    
        hardship_allowanc: number; 
    
        transportation_price: number;   
    
        loan_received_amount: number;  
    
        sum_payroll_additi: number; 
    
        insurance_day_count: number; 
    
        insurance_wage: number;    
    
        insurance_allowance: number; 
    
        employer_insurance_allowance: number;   
    
        payroll_tax: number;   
    
        working_deficit_hours: number;  
    
        working_deficit_amount: number; 
    
        loan_installment_amount: number; 
    
        advance_money: number; 
    
        purchase_invoice_from_company: number;  
    
        food_cost: number; 
    
        pension_cost: number; 
    
        //  اضافه اکسل
    
        delay_penalty: number; 
    
        absence_penalty: number; 
    
        fund_reserve: number; 
    
        fund_reserve_yearly_repay: number;  
    
        sum_payroll_deductions: number;  
    
        payroll_received: number;  
    
        payment_date: number;  
    
        inverse_payroll_received: number;  
    
        sum_over_night_friday_amounts: number;  
    
        without_pay_leave: number;  
    
        without_pay_leave_amount: number;  
   

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}


