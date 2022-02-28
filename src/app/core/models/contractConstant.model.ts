
import { BusinessList } from "./business.model";
import { Deserializable } from "./deserializable.model";
import { Employee } from "./employee.model";
import { Employer } from "./employer.model";

export class contractConstant implements Deserializable {
	id !: number;
	year !: number;
	grocery_allowance !: number;
	children_allowance !: number;
	housing_allowance !: number;
	max_new_year_gift !: number;
	max_bonus !: number;
	createdAt !: string;
	createdAtEn !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class contractConditions implements Deserializable {
	id !: number;
	name !: string;
	template !: string;
	type !: string;
	business_categories !: number[];
	businesses !: number[];
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class contractTemplate implements Deserializable {
	id !: number;
	name !: string;
	template !: string;
	type !: string;
	business_categories !: number[];
	businesses !: number[];
	header_as_logo !: boolean;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class contract implements Deserializable {
	id !: number;
	business_employee_id !: number;
	contract_template_id !: number;
	title !: string;
	main_text !: string;
	end_text !: string;
	contract_year !: string;
	start_date !: string;
	end_date !: string;
	month_count !: number;
	day_count !: number;
	employee_start_year !: string;
	wage !: number;
	grocery_allowance !: number;
	housing_allowance !: number;
	children_allowance !: number;
	food_cost !: number;
	pension_cost !: number;
	monthly_severance_pay !: number;
	monthly_new_year_gift !: number;
	monthly_bonus !: number;
	calc_severance_base !: boolean;
	calc_bonus_monthly !: number;
	calc_new_year_gift_monthly !: number;
	calc_severance_pay_monthly !: number;
	is_contract_for_future !: boolean;
	is_hourly_contract !: boolean;
	is_manual !: boolean;
	provisos !: ConditionInContract[];
	extra_fields !: ContractExtraField[];
	employer_info !:  Employer;
	employee_info !:  Employee[];
	business_info !:  BusinessList;
	createdAt !: string ;
	createdAtEn !: string ;
	updatedAt !: string ;
	updatedAtEn !: string ;
	deserialize(input: any): this {
		Object.assign(this, input);
		if(input.provisos && input.provisos.length){
			this.provisos = input.provisos.map((column: any) => {
				return new ConditionInContract().deserialize(column);
			});
		}
		if(input.extra_fields && input.extra_fields.length){
			this.extra_fields = input.extra_fields.map((column: any) => {
				return new ConditionInContract().deserialize(column);
			});
		}

		if(input.employee_info && input.employee_info.length){
			this.employee_info = input.employee_info.map((column: any) => {
				return new Employee().deserialize(column);
			});
		}

		this.employer_info = new Employer().deserialize(input.employer_info);
		this.business_info =  new BusinessList().deserialize(input.business_info);




		return this;

	}
}

export class ConditionInContract implements Deserializable {

	contract_proviso_template_id !: number;
	proviso_text !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class ContractExtraField implements Deserializable {

	contract_extra_field_id !: number;
	price !: number;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
