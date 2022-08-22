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
    contract_info!: contract
    createdAt: string
    createdAtEn: string
    payroll_deductions!:object
    payroll_additions!:object
   
 

	deserialize(input: any): this {
		Object.assign(this, input);
        if (input.contract_info) {
            this.contract_info=new contract().deserialize(input.contract_info) 
        }
		return this;
	}
}

