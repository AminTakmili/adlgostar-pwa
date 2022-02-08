import { Deserializable } from "./deserializable.model";

export class  Address implements Deserializable {
	address !: string;
	city_id !: number;
	phone !: string;
	postal_code !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
