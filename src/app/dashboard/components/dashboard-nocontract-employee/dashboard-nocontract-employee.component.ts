import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-dashboard-nocontract-employee',
  templateUrl: './dashboard-nocontract-employee.component.html',
  styleUrls: ['./dashboard-nocontract-employee.component.scss'],
})
export class DashboardNocontractEmployeeComponent implements OnInit {
	loading: boolean = false;
	dataList: Employee[] =[];
	limit = 6;
	offset = 0;
	total = 0;
	end = false;
	constructor(
		public global: GlobalService
	) { }

	ngOnInit() {
		this.getData();
	}

	async getData(event: any = undefined , isrefresh = false) {
		//dashboard/finishingContracts


		this.loading = true;
		this.global.httpPost('dashboard/withoutContractEmployees', {
			limit: this.limit,
			offset: this.offset
		}).subscribe(async (res: any) => {


			this.total = res.totalRows;
			res.list.map((item: any) => {
				const data =  new Employee().deserialize(item);
				this.dataList.push(data);
			});

			if (res.list.length < this.limit) {
				this.end = true;
			}

			if(event !== undefined){
				event.target.complete();
			}
			// this.firstReq++;
			this.offset += this.limit ;

			// console.log("this.end",this.end);

			this.loading = false;
		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});
	}

}
