import { Deserializable } from "./deserializable.model";

export class notificationType implements Deserializable {
    name!:string
	value!:string
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class notification implements Deserializable {
 
        id !:number
        user_ticket_id !:number
        type !:string 
        title !:string 
        notifiable_type !:string
        notifiable_id !:string
        notification_info !:any[]       
        status !:string 
        description !:string
        createdAt !:string
        createdAtEn !:string
        updatedAt !:string
        updatedAtEn !:string
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
