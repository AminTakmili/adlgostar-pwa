import { BusinessList } from 'src/app/core/models/business.model';
import { Deserializable } from './deserializable.model';
import { Employee } from 'src/app/core/models/employee.model';

export class loan implements Deserializable {
	id!: number;
	business_employee_id!: number;
	amount!: number;
	month!: number;
	year!: number;
	createdAt!: string;
	createdAtEn!: string;
	updatedAt!: string;
	updatedAtEn!: string;
	business_info!: BusinessList;
	employee_info!: Employee;
    date!:string
    details!:loanDetails

	deserialize(input: any): this {
        if (input.business_info) {
            this.business_info=new BusinessList().deserialize(input.business_info)
        }
        if (input.employee_info) {
            this.employee_info=new Employee().deserialize(input.employee_info)
        }
        if (input.details) {
            this.details=new loanDetails().deserialize(input.details)
        }
		Object.assign(this, input);
		return this;
	}
}
export class loanDetails implements Deserializable {
	id!: number;
	month!: number;
    installment_amount!:string;

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
