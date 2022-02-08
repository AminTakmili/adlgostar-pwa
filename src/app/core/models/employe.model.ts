import { Deserializable } from "./deserializable.model";

export class Employer implements Deserializable {
	id !: number;
	first_name !: string;
	last_name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
