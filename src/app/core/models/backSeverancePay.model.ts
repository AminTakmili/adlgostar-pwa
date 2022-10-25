import { contract } from './contractConstant.model';

import { Deserializable } from './deserializable.model';

export class backSeverancePayList implements Deserializable {
	contract_id !: number;
	business_employee_id !: number;
	year !: string;
	month !: number;
	back_severance_pay !: number;
	
    contract_info!:contract
   
	
	deserialize(input: any): this {
		Object.assign(this, input);
        
		if(input.contract_info && input.contract_info.length){
			this.contract_info = input.employers_info.map((column: any) => {
				return new contract().deserialize(column);
			});
		}
		if(input.month && typeof(input.month)=='string' ){
			this.month = parseInt(input.month) 
		}
		return this;
	}
}