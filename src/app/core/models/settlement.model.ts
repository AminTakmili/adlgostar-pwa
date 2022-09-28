import { Deserializable } from './deserializable.model';

export class settlementList implements Deserializable {
	id ! : number;
	business_employee_id ! : number;
	business_id ! : number;
	employee_id ! : number;
	is_confirmed ! : number;
	employee_name ! : string;
	settlement_template_id ! : number;
	employee_start_date ! : string;
	leave_work_date ! : string;
	severance_pay_calc_type ! : string;
	new_year_gift_calc_type ! : string;
	bonus_calc_type ! : string;
	unused_leave_calc_type ! : string;
	wage ! : number;
	grocery_allowance ! : number;
	housing_allowance ! : number;
	children_allowance ! : number;
	severance_pay ! : number;
	new_year_gift ! : number;
	bonus ! : number;
	unused_leave_amount ! : number;
	calc_wage_monthly ! : number;
	calc_grocery_allowance_monthly ! : number;
	calc_housing_allowance_monthly ! : number;
	createdAt ! : string;
	createdAtEn ! : string;
	updatedAt ! : string;
	updatedAtEn ! : string;

	
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class settlementTemplate implements Deserializable {
	id ! : number;
	name ! : string;
	template ! : string;
	type ! : string;
	createdAt ! : string;
	createdAtEn ! : string;
	updatedAt ! : string;
	updatedAtEn ! : string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class payrollAddition implements Deserializable {
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

export class payrollDeduction implements Deserializable {
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

