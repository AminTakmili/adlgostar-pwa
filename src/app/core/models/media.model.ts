import { Deserializable } from "./deserializable.model";

export class Media implements Deserializable {
	id!: number;
	name!: string;
	path!: string;
	mimeType!: string;
	options: mediaOption;
	// subSizes: any;
	deserialize(input: any): this {
		Object.assign(this, input);

		return this;
	}
}
export class mediaOption implements Deserializable {
	subSizes: any;
	// subSizes: any;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class subSizes implements Deserializable {
	'1x': string;
	'2x': string;
	'3x': string;
	'4x': string;
	// subSizes: any;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
