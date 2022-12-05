
import { Deserializable } from './deserializable.model';

export class form implements Deserializable {
	id !: number;
	business_employee_id !: number;
	form_template_id !: number;
	form_text !: string;
	form_date !: string;
	createdAt !: string;
	createdAtEn !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}