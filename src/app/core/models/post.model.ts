import { Deserializable } from "./deserializable.model";

export class Post implements Deserializable {
	id!: number;
	name!: string;
	createdAt!: string;
	createdAtEn!: string;
	updatedAt!: string;
	updatedAtEn!: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
