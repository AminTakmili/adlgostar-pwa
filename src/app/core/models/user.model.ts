import { Address } from "./address.model";
import { Deserializable } from "./deserializable.model";
import { Media } from "./media.model";

export class User implements Deserializable {
	id ! : number;
	is_employer! : boolean;
	role_id !: string;
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
	userType ! : UserType;
	addresses !: Address[];
	role !: UserRole;
	media !: Media[];
	permissionsCat  !: permision[];
	permissionsList : permissionsDetail[] = [];
	deserialize(input: any): this {
		Object.assign(this, input);
		if(input.first_name && input.last_name){
			this.full_name = input.first_name +' '+input.last_name ;
		}
		if(input.permissions && input.permissions.length){
			this.permissionsList = [];
			input.permissions.map((per:any)=>{
				if(per.permissions && per.permissions.length){
					 per.permissions.map((item:any)=>{
						this.permissionsList.push(new permissionsDetail().deserialize(item));
					})
				}
				if(per.children && per.children.length){
					 per.children.map((item:any)=>{
						 if (item.permissions&&item.permissions.length) {
							item.permissions.map((childPermissin:any)=>{

								this.permissionsList.push(new permissionsDetail().deserialize(childPermissin));
							})
						 }
					})
				}
			})
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
	user_type : UserType;
	user_type_id ! : string;
	user_type_name ! : string;
	is_default_employer_role ! : number;
	name ! : string;
	permissions ! : permissionsDetail[];
	createdAt ! : string;
	createdAtEn ! : string;
	updatedAt ! : string;
	updatedAtEn ! : string;
	deserialize(input: any): this {
		Object.assign(this, input);
		this.user_type = input.user_type;
		this.user_type_name = input.user_type.name;
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
		
		if(input.permissions && input.permissions.length){
			this.permissions = input.permissions.map((permission: any) => {
				return new permissionsDetail().deserialize(permission);
			});
		}
		return this;
	}
}
export class permissionsDetail implements Deserializable {
	id ! : number;
	name ! : string;
	app_route!  :  string;
	en_name ! : string;
	is_checked : boolean = false;
	access : boolean = false;
	permission_category !: permision;
	children !: permissionsDetail[];
	deserialize(input: any): this {
		Object.assign(this, input);
		if(input.permission_category){
			this.permission_category = input.permission_category;
			// if()
		}
		return this;
	}
}
