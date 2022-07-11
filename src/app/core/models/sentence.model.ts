import { contract, childrenAllowances } from './contractConstant.model';
// import { BusinessList } from './business.model';
// import { Employee } from 'src/app/core/models/employee.model';
// import { Employer } from './employer.model';
import { Deserializable } from './deserializable.model';

export class sentence implements Deserializable {
    id !: number;
    is_confirmed !: number;
	business_id !: number;
    date!:string
    wage !: number;
    trust_allowance!: number;
   grocery_allowance!: number;
   housing_allowance !: number;
   count_children_allowance!: number;
   children_allowance!: number;
   food_cost!: number;
   pension_cost!: number;
   has_monthly_severance_pay!: number;
   has_monthly_new_year_gift!: number;
   has_monthly_bonus!: number;
   calc_payroll_tax!: number;
   calc_unused_leave_monthly!: number;
   createdAt!:string;
   createdAtEn !:string;
   updatedAt!:string;
   updatedAtEn!:string;
   contract_info!:contract
   children_allowance_info:childrenAllowances[]

	deserialize(input: any): this {
		Object.assign(this, input);
	
		if(input. contract_info && input. contract_info.length){
			this. contract_info = input.employers_info.map((column: any) => {
				return new contract().deserialize(column);
			});
		}

		// this.employers_info = new Employer().deserialize(input.employer_info);
		// this.business_info =  new BusinessList().deserialize(input.business_info);




		return this;

	}
}
