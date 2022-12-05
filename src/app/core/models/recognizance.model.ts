import { contractFooterTemplate, contractHeaderTemplate } from './contractConstant.model';
import { BusinessList } from './business.model';
import { Employee } from './employee.model';
import { Deserializable } from './deserializable.model';

export class recognizance implements Deserializable {
	id !: number;
	is_confirmed !: number;

    recognizance_template_id!: number;
    business_employee_id!: number;
    title !: string;
	end_text !: string;
	main_text !: string;
	
	start_date !: string;

	employee_info !:  Employee;
	business_info !:  BusinessList;
	createdAt !: string ;
	createdAtEn !: string ;
	updatedAt !: string ;
	updatedAtEn !: string ;
	loadingDownload:boolean

	// is_confirmed!:number
	recognizance_header_template_info!:contractHeaderTemplate
	recognizance_footer_template_info!:contractFooterTemplate
	deserialize(input: any): this {
		Object.assign(this, input);
		
	
			this.employee_info = new Employee().deserialize(input.employee_info);
			this.business_info =  new BusinessList().deserialize(input.business_info);
			this.loadingDownload=false
	
	

	

		return this;

	}
}
export class recognizanceTemplate implements Deserializable {
	id !: number;
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