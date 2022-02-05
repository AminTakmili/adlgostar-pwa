import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
	id ! : number;
	firstName ! : string;
	lastName ! : string;
	mobile ! : string;
	access_token ! : string;
	role ! : object;
	userType ! : object;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
