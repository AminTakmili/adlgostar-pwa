import { Component, OnInit } from '@angular/core';
import { contract } from 'src/app/core/models/contractConstant.model';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
	selector: 'app-dashboard-expire-contracts',
	templateUrl: './dashboard-expire-contracts.component.html',
	styleUrls: ['./dashboard-expire-contracts.component.scss'],
})
export class DashboardExpireContractsComponent implements OnInit {

	loading: boolean = false;
	dataList: contract[] =[];
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
		this.global.httpPost('dashboard/finishingContracts', {
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
