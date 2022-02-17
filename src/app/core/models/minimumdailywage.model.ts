import { Deserializable } from "./deserializable.model";

export class minimumDailyWage implements Deserializable {
	id !: number;
	minimum_wage !: number;
	year !: number;
	createdAt !: string;
	createdAtEn !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
