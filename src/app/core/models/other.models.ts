import { Deserializable } from "./deserializable.model";
import { User } from "./user.model";

export class importer implements Deserializable {
	id!: number;
	user_info!: User;
	type!: string;
	id_range!: string;
	status!: string;
	count!: number;
	description!: string;
	createdAtEn!: string;
	createdAt!: string;
	updatedAtEn!: string;
	updatedAt!: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class error implements Deserializable {
	row!: number;
	msg!: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class dashboard implements Deserializable {
	contract_count!: number;
	employee_count!: number;
	finishing_contracts_count!: number;
	without_contract_employees_count!: number;

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class bookmarks implements Deserializable {
	id !:number;
	title!: string;
	link!: string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
