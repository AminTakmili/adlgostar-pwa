import { Deserializable } from "./deserializable.model";

export class StaticData implements Deserializable {
	contract_template_type!: DataSets[];
	degree!: DataSets[];
	employee_status!: DataSets[];
	employer_type!: DataSets[];
	gender!: DataSets[];
	maritalStatus!: DataSets[];
	military_status!: DataSets[];
	deserialize(input: any): this {
		Object.assign(this, input);
		if(input.contract_template_type && input.contract_template_type.length){
			this.contract_template_type = input.contract_template_type.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}
		if(input.degree && input.degree.length){
			this.degree = input.degree.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}
		if(input.employee_status && input.employee_status.length){
			this.employee_status = input.employee_status.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}
		if(input.employer_type && input.employer_type.length){
			this.employer_type = input.employer_type.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}
		if(input.gender && input.gender.length){
			this.gender = input.gender.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}
		if(input.maritalStatus && input.maritalStatus.length){
			this.maritalStatus = input.maritalStatus.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}
		if(input.military_status && input.military_status.length){
			this.military_status = input.military_status.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}
		return this;
	}
}

export class DataSets implements Deserializable {
	name!: string;
	value!: string;
	id!: number;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}


