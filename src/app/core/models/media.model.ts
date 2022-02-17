import { Deserializable } from "./deserializable.model";

export class Media implements Deserializable {
	id!: number;
	name!: string;
	path!: string;
	options: any;
	// subSizes: any;
	deserialize(input: any): this {
		// if (input.options) this.subSizes = input.options.subSizes;
		this.path = input.path;
		this.id = input.id;
		this.name = input.name;
		Object.assign(this);
		return this;
	}
}
