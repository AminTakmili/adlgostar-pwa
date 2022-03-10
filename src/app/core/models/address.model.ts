
import { Deserializable } from "./deserializable.model";

export class  Address implements Deserializable {
	address !: string;
	city_id !: number;
	city !: City;
	phone !: string;
	postal_code !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class  City implements Deserializable {
	id !: string;
	name !: number;
	province !: province;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class  province implements Deserializable {
	id !: string;
	name !: number;
	country !: country;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class  country implements Deserializable {
	id !: string;
	name !: number;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
