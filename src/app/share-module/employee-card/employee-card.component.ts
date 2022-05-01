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
	@Input() deleteId: number = 0;

	constructor() { }

	ngOnInit() { }

	removeItem(item:number){

		this.deleteEmployeeBussiness.emit(item);
	}

}
