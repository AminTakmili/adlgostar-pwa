
import { Deserializable } from "./deserializable.model";
import { User } from "./user.model";

export class  Support implements Deserializable {
	id !: number ;
	subject !: string;
	status !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	createdAt !: string;
	createdAtEn !: string;
	details !: supportDetail[];
	user_info !: User;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}


export class  supportDetail implements Deserializable {
	content !: string;
	is_response !: Boolean ;
	user_info !: User;
	createdAt !: string;
	createdAtEn !: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
