import { BusinessList } from "./business.model";
import { Deserializable } from "./deserializable.model";
import { Employee } from "./employee.model";
import { Employer } from "./employer.model";
import { User } from 'src/app/core/models/user.model';

export class contractConstant implements Deserializable {
	id !: number;
	title !: number;
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
export class contractHeaderTemplate implements Deserializable {
    id !: number;
    contract_header_template_id !: number;
    header_text!:string
    template!:string
    name!:string

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;

	}
}
export class contractFooterTemplate implements Deserializable {
    id !: number;
    contract_footer_template_id !: number;
    footer_text!:string
    template!:string
    name!:string

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;

	}
}


export class contract implements Deserializable {
	id !: number;
	is_confirmed !: number;
	confirm_date !: string;
	confirmer_info !: User;
	business_id !: number;
	contract_condition_id !: number;
	business_employee_ids !: number[];
	contract_id !: number;
	business_employee_id !: number;
	contract_template_id !: number;
	severance_pay !: number;
	new_year_gift !: number;
	bonus !: number;
	title !: string;
	main_text !: string;
	header_text !: string;
	footer_text!: string;
	employee_start_date !: string;
	end_text !: string;
	contract_year !: string;
	start_date !: string;
	end_date !: string;
	month_count !: number;
	day_count !: number;
	employee_start_year!: string;
	wage !: number;
	grocery_allowance !: number;
	housing_allowance !: number;
	children_allowance !: number;
	children_allowances !: childrenAllowances[];
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
	calc_payroll_tax !: boolean;
	calc_unused_leave_monthly !: boolean;
	provisos !: ConditionInContract[];
	extra_fields !: ContractExtraField[];
	employers_info !:  Employer[];
	employee_info !:  Employee[];
	business_info !:  BusinessList;
	createdAt !: string ;
	createdAtEn !: string ;
	updatedAt !: string ;
	updatedAtEn !: string ;
	// is_confirmed!:number
	contract_header_template_info!:contractHeaderTemplate
	contract_footer_template_info!:contractFooterTemplate
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
		if(input.children_allowances && input.children_allowances.length){
			this.children_allowances = input.children_allowances.map((column: any) => {
				return new childrenAllowances().deserialize(column);
			});
		}
		if(input.employers_info && input.employers_info.length){
			this.employers_info = input.employers_info.map((column: any) => {
				return new Employer().deserialize(column);
			});
		}
		if(input.confirmer_info && input.confirmer_info.id){
			this.confirmer_info=new User().deserialize(input.confirmer_info)
		}

		// this.employers_info = new Employer().deserialize(input.employer_info);
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

export class contractTemplateVariable implements Deserializable {

	id !: number;
	variable !: string;
	description !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class contractFooterTemplateDetail implements Deserializable {

	id !: number;
	used_in_contract !: boolean;
	template !: string;
	name !: string;
	createdAt !: string;
	createdAtEn !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class contractHeaderTemplateDetail implements Deserializable {

	id !: number;
	template !: string;
	name !: string;
	createdAt !: string;
	createdAtEn !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	used_in_contract !: boolean;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}


export class childrenAllowances implements Deserializable {

	count_children_allowance:number
	business_employee_id !: number;
	children_allowance !: number;
	employee_id !: number;
	employee_name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

