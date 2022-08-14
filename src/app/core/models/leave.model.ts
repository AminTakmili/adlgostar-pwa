import { BusinessList } from 'src/app/core/models/business.model';
import { Deserializable } from './deserializable.model';
import { Employee } from 'src/app/core/models/employee.model';

export class leave implements Deserializable {
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

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
