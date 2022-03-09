import { Address } from "./address.model";
import { Deserializable } from "./deserializable.model";
import { Media } from "./media.model";

export class Employer implements Deserializable {
	id !: number;
	role_id !: string;
	first_name !: string;
	last_name !: string;
	full_name !: string;
	mobile !: string;
	birth_certificate_code !: number;
	national_code !: number;
	birth_place !: string;
	born_at !: string;
	birth_certificate_issuance_place !: string;
	gender !: string;
	email !: string;
	image !: string;
	addresses !: Address[];

	media !: Media[];
	deserialize(input: any): this {
		Object.assign(this, input);
		if (input?.media && input?.media.length) {
			this.media = input.media.map((item: Media) => {
				return new Media().deserialize(item);
			});
		}
		if (input?.first_name && input?.last_name) {
		this.full_name = input.first_name+' '+input.last_name;
		}
		return this;
	}
}
