import { Deserializable } from "./deserializable.model";

export class countries implements Deserializable {
	id !: number;
	name !: string;
	provinces !: provinces[];
	deserialize(input: any): this {
		Object.assign(this, input);
		this.provinces = input.provinces.map((column: any) => {
			return new provinces().deserialize(column);
		});
		return this;
	}
}

export class provinces implements Deserializable {
	id !: number;
	name !: string;
	cities !: cities[];
	deserialize(input: any): this {
		Object.assign(this, input);
		this.cities = input.cities.map((column: any) => {
			return new cities().deserialize(column);
		});
		return this;
	}
}

export class cities implements Deserializable {
	id !: number;
	name !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
