
import { Deserializable } from './deserializable.model';

export class formTemplate implements Deserializable {
	id !: number;
	name !: string;
	template !: string;
	createdAt !: string;
	createdAtEn !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}