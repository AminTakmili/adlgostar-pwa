import { Deserializable } from "./deserializable.model";

export class basicYears implements Deserializable {
	id !: number;
	contract_year !: number;
	start_year !: number;
	severance_base_price !: number;
	createdAt !: string;
	createdAtEn !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
