
import { Deserializable } from './deserializable.model';

export class formTemplate implements Deserializable {
	id !: number;
	form_type_id !: number;
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
export class formTemplateType implements Deserializable {
	id !: number;
	en_name !: string;
	fa_name !: string;

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class formTemplateVariable implements Deserializable {
	id !: number;
	variable !: string;
	description !: string;
	input_type !: string;
	value !: string;
	isRequired !: boolean;

	deserialize(input: any): this {
		Object.assign(this, input);
		if(input.variable){
			console.log((input.variable.replace('{','')).replace('}',''));

			this.variable=(input.variable.replace('{','')).replace('}','')

			// console.log(input.variable.split(''));
			// let domy:any=[]
			// input.variable.split('').map((item:string,index:number)=>{
			// 	if (index!=0&&index!=(input.variable.split('').length-1)) {
			// 		domy.push(item)
			// 	}

			// })
			// console.log(domy);
			// console.log(domy.join(''));

		}
		
		this.isRequired=true
		return this;
	}
}