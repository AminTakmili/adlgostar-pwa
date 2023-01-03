import { contract } from 'src/app/core/models/contractConstant.model';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-admin-report-inactivecontract',
  templateUrl: './admin-report-inactivecontract.component.html',
  styleUrls: ['./admin-report-inactivecontract.component.scss'],
})
export class AdminReportInactivecontractComponent implements OnInit {
	loading: boolean = false;
	dataList: contract[] =[];
	limit = 6;
	offset = 0;
	total = 0;
	end = false;

	constructor(
		public global: GlobalService,

	) { 
  
  }

	ngOnInit() {
		this.getData();

	}

	async getData(event: any = undefined , isrefresh = false) {
		//dashboard/finishingContracts


		this.loading = true;
		this.global.httpPost('adminReport/inActiveContractList', {
			limit: this.limit,
			offset: this.offset
		}).subscribe(async (res: any) => {


			this.total = res.totalRows;
			res.list.map((item: any) => {
				const data =  new contract().deserialize(item);
				this.dataList.push(data);
			});

			if (res.list.length < this.limit) {
				this.end = true;
			}
      console.log(this.dataList);

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
