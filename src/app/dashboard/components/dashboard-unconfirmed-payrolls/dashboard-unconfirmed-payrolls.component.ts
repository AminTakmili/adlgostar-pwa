import { StorageService } from './../../../core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-dashboard-unconfirmed-payrolls',
  templateUrl: './dashboard-unconfirmed-payrolls.component.html',
  styleUrls: ['./dashboard-unconfirmed-payrolls.component.scss'],
})
export class DashboardUnconfirmedPayrollsComponent implements OnInit {

  loading: boolean = false;
	dataList: any[] =[];
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
		this.global.httpPost('expertDashboard/unConfirmedPayrollsList', {
			limit: this.limit,
			offset: this.offset
		}).subscribe(async (res: any) => {


			this.total = res.totalRows;
			res.list.map((item: any) => {
				console.log(item);
				this.dataList.push(item);
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
