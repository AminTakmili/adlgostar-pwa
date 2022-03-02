import { StringLiteralLike } from "typescript";
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
	mobile !: string;
	national_code !: string;
	business_employee_info !: businessEmployeeInfo[];
	business_employee_id !: number;
	businesses !: businessEmployeeDetail[];
	posts !: Post[];
	media !: Media[];
	deserialize(input: any): this {

		if (input.posts && input.posts.length) {
			this.posts = input.posts.map((item: Post) => {
				return new Post().deserialize(item);
			});
		}
		if (input?.media && input?.media.length) {
			this.media = input.media.map((item: Media) => {
				return new Media().deserialize(item);
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
	business !: businessEmployee[];
	createdAt !: string;
	createdAtEn !: string;
	employee_status !: string;
	has_insurance !: boolean;
	net_income !: number;
	specialty !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	work_hours !: number;
	work_place !: string;

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
	employee_status !: string ;
	name!: string;
	posts !: Post[];
	deserialize(input: any): this {
		Object.assign(this, input);
		if (input.posts && input.posts.length) {
			this.posts = input.posts.map((item: Post) => {
				return new Post().deserialize(item);
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
