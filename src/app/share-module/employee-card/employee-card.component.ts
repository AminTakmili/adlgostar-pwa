import { GlobalService } from './../../core/services/global.service';
import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-employee-card',
	templateUrl: './employee-card.component.html',
	styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {

	@Output() deleteEmployeeBussiness = new EventEmitter<number>();

	@Input() employee: Employee;
	@Input() contractid: number = 0;
	@Input() businessId: number = 0;
	@Input() businessEmId: number = 0;
	@Input() deleteId: number = 0;
	@Input() isSentence!: boolean;

	loadingDownload:boolean=false
	constructor(
		private global:GlobalService
	) { }

	ngOnInit() { }

	removeItem(item:number){

		this.deleteEmployeeBussiness.emit(item);
	}
	download(contract_id:number,employee_id:number){

		this.loadingDownload=true
		console.log("object");

		this.global.httpPost('contract/pdf',{contract_id,employee_id}).subscribe(
			async (res:any) => {
				this.loadingDownload=false

				console.log(res);
			},
			async (error:any) => {
				this.loadingDownload=false

				this.global.showError(error)
				console.log(error);
			},
		)
	}

}
