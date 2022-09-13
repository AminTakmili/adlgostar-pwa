import { Meta } from '@angular/platform-browser';
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
	@Input() isCollaboration: number;
	@Input() settlementId: number | string;
	@Input() contractid: number = 0;
	@Input() businessId: number = 0;
	@Input() businessEmId: number = 0;
	@Input() deleteId: number = 0;
	@Input() isSentence!: boolean;

	loadingDownload: boolean = false;
	constructor(public global: GlobalService) // private metaService: Meta,

	{}

	ngOnInit() {
		console.log(this.settlementId);
		// this.metaService.updateTag({ name: 'referrer', content: 'no-referrer'});
	}

	removeItem(item: number) {
		this.deleteEmployeeBussiness.emit(item);
	}
	download(contract_id: number, employee_id: number,first_name:string,last_name:string) {
		this.loadingDownload = true;
		const fullName=first_name+' '+ last_name
		console.log(fullName);

		this.global
			.httpPost('contract/pdf', { contract_id, employee_id })
			.subscribe(
				async (res: any) => {
					this.loadingDownload = false;
				;

					// console.log(res);
					// console.log(res.file);
					const byteArray = new Uint8Array(atob(res.file).split('').map(char => char.charCodeAt(0)));

					
					var file = new Blob([byteArray], {
						 type: 'application/pdf',
					});
					var fileURL = URL.createObjectURL(file);
					
					const link = document.createElement('a');
					link.href = fileURL;
					link.download = ` قرارداد ${fullName}.pdf`;
					document.body.append(link);
					link.click();
					link.remove();
					setTimeout(() => URL.revokeObjectURL(link.href), 7000);
				},
				async (error: any) => {
					this.loadingDownload = false;
					this.global.showError(error);
					// console.log(error);

				}
			);
	}
}
