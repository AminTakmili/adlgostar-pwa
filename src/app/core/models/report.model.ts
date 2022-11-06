
import { Deserializable } from "./deserializable.model";

export class  reportLoan implements Deserializable {
	sum_loan_amount !: number ;
	month !: number ;
	year !: number ;
	business_name !: string;
	employee_name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class  reportLeave implements Deserializable {
	amount !: number ;
	month !: number ;
	year !: number ;
	business_name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
