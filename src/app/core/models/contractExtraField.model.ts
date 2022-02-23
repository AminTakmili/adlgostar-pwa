import { Deserializable } from "./deserializable.model";

export class contractExtraField implements Deserializable {
	id !: number;
	name !: string;
	add_to_bonus !: number;
	createdAt !: string;
	createdAtEn !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
