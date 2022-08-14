import { Deserializable } from './deserializable.model';

export class settlementTemplate implements Deserializable {
	id ! : number;
	name ! : string;
	template ! : string;
	type ! : string;
	createdAt ! : string;
	createdAtEn ! : string;
	updatedAt ! : string;
	updatedAtEn ! : string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class payrollAddition implements Deserializable {
    id: number
    name: string
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string
 

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class payrollDeduction implements Deserializable {
    id: number
    name: string
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string
 

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

