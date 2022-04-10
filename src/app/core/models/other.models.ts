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
