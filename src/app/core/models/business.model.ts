import { Deserializable } from "./deserializable.model";

export class businessCategory implements Deserializable {
	id !: number;
	name !: string;
	subCategory !: subBusinessCategory[];
	deserialize(input: any): this {
		Object.assign(this, input);
		this.subCategory = input.child.map((column: any) => {
			return new subBusinessCategory().deserialize(column);
		});
		return this;
	}
}

export class subBusinessCategory implements Deserializable {
	id !: number;
	name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class business implements Deserializable {
	id !: number;
	name !: string;
	category !: string;
	createdAt !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
