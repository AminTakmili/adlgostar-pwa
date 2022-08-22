import { Deserializable } from './deserializable.model';

export class workingHourList implements Deserializable {
    id: number
    year: number
    month: number
    monthName: string
    count_day: number
    count_friday: number
    count_holiday: number
    count_working_day: number
    amount: number
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class payrollTaxList implements Deserializable {
    id: number
    year: number
    from_amount: number
    to_amount: number
    percent: number 
    amount: number
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

export class payrollAdditiLonist implements Deserializable {
    id: number
    name: string
    en_name: string
    taxable: number
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string
    isRequired!:boolean


	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}


export class payrollDeductionLonist implements Deserializable {
    id: number
    name: string
    en_name: string
    createdAt: string
    createdAtEn: string
    updatedAt: string
    updatedAtEn:string
    isRequired!:boolean
 

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}

