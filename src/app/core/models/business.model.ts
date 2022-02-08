import { Address } from "./address.model";
import { Deserializable } from "./deserializable.model";
import { Employer } from "./employe.model";
import { Employee } from "./employee.model";

export class BusinessCategory implements Deserializable {
	id !: number;
	name !: string;
	subCategory !: SubBusinessCategory[];
	deserialize(input: any): this {
		Object.assign(this, input);
		if(this.subCategory ){
			this.subCategory = input.child.map((column: any) => {
				return new SubBusinessCategory().deserialize(column);
			});
		}
		return this;
	}
}

export class SubBusinessCategory implements Deserializable {
	id !: number;
	name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class BusinessList implements Deserializable {
	id !: number;
	name !: string;
	category !: string;
	createdAt !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class Business implements Deserializable {
	id !: number;
	employer_id !: number;
	name !: string;
	employer_type !: string;
	registration_number !: string;
	business_license_number !: string;
	national_id !: string;
	business_category !: BusinessCategory;
	createdAt !: string;
	employees !: Employee[];
	employer !: Employer;
	addresses !: Address[];
	deserialize(input: any): this {
		this.employees = input.employees.map((item: Employee) => {
			return new Employee().deserialize(item);
		});
		this.addresses = input.addresses.map((item: Address) => {
			return new Address().deserialize(item);
		});
		this.business_category = new BusinessCategory().deserialize(this.business_category);
		this.employer = new Employer().deserialize(this.employer);
		Object.assign(this, input);
		return this;
	}
}
