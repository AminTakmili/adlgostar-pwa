import { Deserializable } from "./deserializable.model";
import { notificationType } from 'src/app/core/models/notification.model';

export class StaticData implements Deserializable {
	contract_template_type!: DataSets[];
	settlement_type!: DataSets[];
	definition_section_type!: DataSets[];
	ticket_type!: DataSets[];
	badges!: DataSets;
	degree!: DataSets[];
	employee_status!: DataSets[];
	employer_type!: DataSets[];
	gender!: DataSets[];
	maritalStatus!: DataSets[];
	military_status!: DataSets[];
	years!: DataSets[];
	working_shifts!:DataSets[];
	ticket_status!: DataSets[];
	settlement_calc_type!: DataSets[];
	notification_types!: notificationType[];
	deserialize(input: any): this {
		Object.assign(this, input);
		if(input.contract_template_type && input.contract_template_type.length){
			this.contract_template_type = input.contract_template_type.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}
		if(input.settlement_type && input.settlement_type.length){
			this.settlement_type = input.settlement_type.map((item : any)=>{
				return new  DataSets().deserialize(item);
			})
		}

		if(input.years && input.years.length){
			this.years = input.years.map((item : any)=>{
				return new  DataSets().deserialize(item);
			}).reverse()
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
	year !:number;
	deserialize(input: any): this {

		Object.assign(this, input);
		return this;
	}
}
export class badges implements Deserializable {
	
	notifications!: number;
	tickets !:number;
	deserialize(input: any): this {

		Object.assign(this, input);
		return this;
	}
}

export class monthSets implements Deserializable {
	name!: string;
	value!: number;
	
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}


