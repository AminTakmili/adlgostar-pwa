import { Deserializable } from './deserializable.model';
import { User } from './user.model';

export class Support implements Deserializable {
	id!: number;
	subject!: string;
	content!: string;
	status!: string;
	updatedAt!: string;
	updatedAtEn!: string;
	createdAt!: string;
	createdAtEn!: string;
	details!: supportDetail[];
	user_info!: User;
	receiver_info!: User;
	sender_info!: User;
	section_info!: { name: string; id: number };
	deserialize(input: any): this {
		Object.assign(this, input);
		if (this.sender_info) {
			this.sender_info = new User().deserialize(this.sender_info);
		}
		if (this.receiver_info) {
			this.receiver_info = new User().deserialize(this.receiver_info);
		}
		return this;
	}
}

export class supportDetail implements Deserializable {
	content!: string;
	is_response!: Boolean;
	// user_info!: User;
	createdAt!: string;
	createdAtEn!: string;
	id!: number;
	responder_info!: User;
	updatedAt: string;
	updatedAtEn: string;
	user_ticket_id: number;

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
