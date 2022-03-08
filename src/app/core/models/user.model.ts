import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
	id ! : number;
	firstName ! : string;
	lastName ! : string;
	first_name ! : string;
	last_name ! : string;
	full_name ! : string;
	national_code ! : number;
	mobile ! : string;
	email ! : string;
	gender ! : string;
	born_at ! : string;
	birth_place ! : string;
	birth_certificate_code ! : string;
	birth_certificate_issuance_place ! : string;
	is_active ! : number;
	createdAt ! : string;
	createdAtEn ! : string;
	updatedAt ! : string;
	updatedAtEn ! : string;
	access_token ! : string;
	role ! : any;
	userType ! : UserType;
	deserialize(input: any): this {
		Object.assign(this, input);
		if(input.first_name && input.last_name){
			this.full_name = input.first_name +' '+input.last_name ;
		}
		return this;
	}
}
export class UserType implements Deserializable {
	id ! : number;
	name ! : string;
	createdAt ! : string;
	createdAtEn ! : string;
	updatedAt ! : string;
	updatedAtEn ! : string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class UserRole implements Deserializable {
	id ! : number;
	user_type : userType;
	user_type_id ! : string;
	user_type_name ! : string;
	is_default_employer_role ! : string;
	name ! : string;
	permissions ! : permissionsDetail[];
	createdAt ! : string;
	createdAtEn ! : string;
	updatedAt ! : string;
	updatedAtEn ! : string;
	deserialize(input: any): this {
		Object.assign(this, input);
		this.user_type = input.user_type;
		return this;
	}
}

export class userType implements Deserializable {
	id ! : number;
	name ! : string;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class permision implements Deserializable {
	id ! : number;
	name ! : string;
	permissions ! : permissionsDetail[];
	deserialize(input: any): this {
		Object.assign(this, input);
		this.permissions = input.permissions;
		return this;
	}
}
export class permissionsDetail implements Deserializable {
	id ! : number;
	name ! : string;
	app_route!  :  string;
	en_name ! : string;
	is_checked : boolean = false;
	permission_category !: permision;
	deserialize(input: any): this {
		Object.assign(this, input);
		if(input.permission_category){
			this.permission_category = input.permission_category;
		}
		return this;
	}
}
