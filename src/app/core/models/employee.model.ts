import { Address } from "./address.model";
import { Deserializable } from "./deserializable.model";
import { Media } from "./media.model";
import { Post } from "./post.model";
import { StringLiteralLike } from "typescript";
import { contract } from "./contractConstant.model";
import { leave } from './leave.model';
import { loan } from './loan.model';

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
	packDetail!:string
	is_collaboration_ended!:number
	settlement_id!:number|string
	businessEmployeePackInfo:string

	deserialize(input: any): this {
		// console.log(input);
		Object.assign(this, input);

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
		
		if (input?.business_employee_info && input?.business_employee_info?.length==1) {
			this.businessEmployeePackInfo=('نام  :'+input.first_name.trim()+' '+input.last_name.trim() +   ' نام شرکت  :'+input.business_employee_info[0]?.business?.name+'| تاریخ شروع به کار کارمند:'+	input.business_employee_info[0]?.employee_start_date
			)
			
		}else if(input?.business_employee_info &&input?.business_employee_info?.length){
			this.businessEmployeePackInfo='نام  :'+(input.first_name.trim()+' '+input.last_name.trim())+ ' | تعداد کسب و کار ' +(input?.business_employee_info.length)
		}else{
			this.businessEmployeePackInfo='نام  :'+(input.first_name.trim()+' '+input.last_name.trim())+ ' ( بدون کسب وکار ) '
		}
		if (this.full_name&&this.national_code) {
			this.packDetail=` نام : ${this.full_name} ,کد ملی :${this.national_code}  `
		}

		this.full_name = input.first_name.trim()+' '+input.last_name.trim();

		return this;
	}
}

export class businessEmployeeInfo implements Deserializable {

	
	id !: number;
	employee_status !: string;
	specialty !: string;
	net_income !: number;
	work_hours !: number;
	work_hours_in_day !: number;
	work_hours_in_night !: number;
	work_place !: string;
	has_insurance !: boolean;
	business !: businessEmployee;
	createdAt !: string;
	createdAtEn !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	employee_start_date!:string
	businessEmployeePackInfo!:string

	deserialize(input: any): this {

		Object.assign(this, input);
		if( input.business &&  input.business.length){
			this.business = input.business.map((item: businessEmployee) => {
				return new businessEmployee().deserialize(item);
			});
		}
		this.businessEmployeePackInfo= 'نام :'+input.business.name+'| تاریخ شروع به کار کارمند:'+input.employee_start_date

		return this;
	}
}

export class businessEmployee implements Deserializable {

	id !: number ;
	name!: string;
	employee_status !: string ;
	posts !: Post[];
	contracts !: contract[];
	loans !: loan[];
	leaves !: leave[];
	deserialize(input: any): this {
		Object.assign(this, input);

			this.posts = input.posts.map((item: Post) => {
				return new Post().deserialize(item);
			});

		if (input.contracts && input.contracts.length) {
			this.contracts = input.contracts.map((item: contract) => {
				return new contract().deserialize(item);
			});
		}
		if (input.loans && input.loans.length) {
			this.loans = input.loans.map((item: loan) => {
				return new loan().deserialize(item);
			});
		}
		if (input.leaves && input.leaves.length) {
			this.leaves = input.leaves.map((item: leave) => {
				return new leave().deserialize(item);
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
