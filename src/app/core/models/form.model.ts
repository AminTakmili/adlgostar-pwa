
import { Deserializable } from './deserializable.model';

export class form implements Deserializable {
	id !: number;
	business_employee_id !: number;
	form_template_id !: number;
	is_confirmed !: number;
	form_text !: string;
	form_date !: string;
	createdAt !: string;
	createdAtEn !: string;
	updatedAt !: string;
	updatedAtEn !: string;
	loadingDownload!:boolean
	
	deserialize(input: any): this {
		Object.assign(this, input);
		this.loadingDownload=false
	
		return this;
	}
}

export class remainingLoanReceived implements Deserializable {
	id !: number;
	
	date !: string;
	
	
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class remainingLoanInstallment implements Deserializable {
	installment_num !: number;
	installment_amount !: number;
	month !: number;
	year !: number;
	
	
	deserialize(input: any): this {
		Object.assign(this, input);
		if (input.month) {
			this.month= Number(input.month)
		}
		return this;
	}
}