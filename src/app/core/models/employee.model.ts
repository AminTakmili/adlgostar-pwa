import { StringLiteralLike } from "typescript";
import { Address } from "./address.model";
import { contract } from "./contractConstant.model";
import { Deserializable } from "./deserializable.model";
import { Media } from "./media.model";
import { Post } from "./post.model";

export class Employee implements Deserializable {
	id!: number;
	employee_status !: string;
	full_name !: String ;
	first_name !: string;
	last_name !: string;
	business_employee_id !: number;
	father_name !: string;
	national_code !: string;
	mobile !: string;
	gender !: string;
	marital_status !: string;
	birth_date !: string;
	birth_place !: string;
	birth_certificate_number !: string;
	birth_certificate_issuance_place !: string;
	degree_id !: string;
	field_of_study !: string;
	insurance_more_than_720 !: boolean;
	media !: employeeImage;
	email !: string;
	business_employee_info !: businessEmployeeInfo[];
	businesses !: businessEmployeeDetail[];
	addresses !: Address[];
	posts !: Post[];
	// media !: Media[];
	familyInformation !: family_information;
	militaryInformation !: military_information;
	bankInformation !: bank_information;
	deserialize(input: any): this {

		if (input.posts && input.posts.length) {
			this.posts = input.posts.map((item: Post) => {
				return new Post().deserialize(item);
			});
		}


		if (input.business_employee_info && input.business_employee_info.length) {
			this.business_employee_id =  input.business_employee_info[0].id;
			this.business_employee_info = input.business_employee_info.map((item: businessEmployeeInfo) => {
				return new businessEmployeeInfo().deserialize(item);
			});
		}
		if (input?.businesses && input?.businesses.length) {
			this.businesses = input.businesses.map((item: businessEmployeeInfo) => {
				return new businessEmployeeInfo().deserialize(item);
			});
		}

		this.full_name = input.first_name+' '+input.last_name;

		Object.assign(this, input);
		return this;
	}
}

export class businessEmployeeInfo implements Deserializable {

	id !: number;
	employee_status !: string;
	specialty !: string;
	net_income !: number;
	work_hours !: number;
	work_place !: string;
	has_insurance !: boolean;
	business !: businessEmployee;
	createdAt !: string;
	createdAtEn !: string;
	updatedAt !: string;
	updatedAtEn !: string;

	deserialize(input: any): this {

		Object.assign(this, input);
		if( input.business &&  input.business.length){
			this.business = input.business.map((item: businessEmployee) => {
				return new businessEmployee().deserialize(item);
			});
		}

		return this;
	}
}

export class businessEmployee implements Deserializable {

	id !: number ;
	name!: string;
	employee_status !: string ;
	posts !: Post[];
	contracts !: contract[];
	deserialize(input: any): this {
		Object.assign(this, input);

			this.posts = input.posts.map((item: Post) => {
				return new Post().deserialize(item);
			});

		if (input.contracts && input.contracts.length) {
			this.contracts = input.contracts.map((item: Post) => {
				return new contract().deserialize(item);
			});
		}
		return this;
	}
}
export class businessEmployeeDetail implements Deserializable {

	business_id !: number ;
	business_name !: string ;
	contracts!: contract[];
	employee_status !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		if (input?.contracts && input?.contracts.length) {
			this.contracts = input.contracts.map((item: Post) => {
				return new contract().deserialize(item);
			});
		}
		return this;
	}
}
export class employeeImage implements Deserializable {

	id !:number;
	birth_certificate_image !: Media ;
	national_card_image !: Media ;
	military_card_image !: Media ;
	employee_image !: Media;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class family_information implements Deserializable {

	id !:number;
	count_student_child !: string ;
	count_non_student_child_over_18 !: string ;
	total_child !: string ;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class military_information implements Deserializable {

	id !:number;
	military_state !: string ;
	military_exempt_reason !: string ;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class bank_information implements Deserializable {

	id !:number;
	name!: string ;
	branch_name!: string ;
	account_number!: string ;
	card_number!: string ;
	iban_number!: string ;


	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
