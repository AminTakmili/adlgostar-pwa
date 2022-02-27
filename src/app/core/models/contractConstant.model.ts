
import { Deserializable } from "./deserializable.model";

export class contractConstant implements Deserializable {
	id !: number;
	year !: number;
	grocery_allowance !: number;
	children_allowance !: number;
	housing_allowance !: number;
	max_new_year_gift !: number;
	max_bonus !: number;
	createdAt !: string;
	createdAtEn !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class contractConditions implements Deserializable {
	id !: number;
	name !: string;
	template !: string;
	type !: string;
	business_categories !: number[];
	businesses !: number[];
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class contractTemplate implements Deserializable {
	id !: number;
	name !: string;
	template !: string;
	type !: string;
	business_categories !: number[];
	businesses !: number[];
	header_as_logo !: boolean;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
