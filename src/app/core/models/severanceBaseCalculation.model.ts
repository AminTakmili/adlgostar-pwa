import { Deserializable } from "./deserializable.model";

export class severanceBaseCalculation implements Deserializable {
	id !: number;
	contract_year !: number;
	incremental_percent !: string;
	incremental_price !: number;
	base_price !: number;
	createdAt !: string;
	createdAtEn !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
