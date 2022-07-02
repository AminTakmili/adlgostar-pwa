import { Address } from "./address.model";
import { Deserializable } from "./deserializable.model";
import { Employer } from "./employer.model";
import { Employee } from "./employee.model";

export class BusinessCategory implements Deserializable {
	id !: number;
	name !: string;
	createdAt !: string;
	createdAtEn !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	parent_id !: number;
	subCategory !: SubBusinessCategory[];
	deserialize(input: any): this {
		Object.assign(this, input);
		if (input?.child && input?.child.length) {
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
	parent_id  !: number;
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
	employer_ids !: number[];
	name !: string;
	employer_type !: string;
	registration_number !: string;
	business_license_number !: string;
	national_id !: string;
	business_category !: BusinessCategory;
	createdAt !: string;
	employees !: Employee[];
	employer !: Employer[];
	addresses !: Address[];
	deserialize(input: any): this {
		Object.assign(this, input);
		if (input.employees && input.employees.length) {
			this.employees = input.employees.map((item: Employee) => {
				return new Employee().deserialize(item);
			});
		}
		if (input.addresses && input.addresses.length) {
			this.addresses = input.addresses.map((item: Address) => {
				return new Address().deserialize(item);
			});
		}
		this.business_category = new BusinessCategory().deserialize(this.business_category);

		if (input.employers && input.employers.length) {
			this.employer = input.employers.map((item: Address) => {
				return new Employer().deserialize(item);
			});
		}
		// this.employer = new Employer().deserialize(this.employer);

		return this;
	}
}
