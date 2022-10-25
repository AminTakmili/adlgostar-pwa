import { backSeverancePayList } from './../../core/models/backSeverancePay.model';
import { GlobalService } from './../../core/services/global.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { formTemplate } from 'src/app/core/models/form-template.model';

@Component({
  selector: 'app-business-back-severance-pay-list-table',
  templateUrl: './business-back-severance-pay-list-table.component.html',
  styleUrls: ['./business-back-severance-pay-list-table.component.scss'],
})
export class BusinessBackSeverancePayListTableComponent implements OnInit {


  @Input('businessId') businessId:string

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
  dataList:backSeverancePayList[]
  loaded:boolean=false
  formTempeletList: formTemplate[];
  

  constructor(
    public global:GlobalService
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(changes.businessId.currentValue      );
    this.getData(changes.businessId.currentValue)
  
  }
  
	async getData(filtered_business_id:number) {
		// console.log(this.filtered_confirm_date);
	
    this.loaded=true
		this.global.httpPost('employerDashboard/backSeverancePayList', {
			limit: this.limit,
			offset: this.offset,
      filtered_business_id
			

		}).subscribe(async (res: any) => {
      this.loaded=false
			this.total = res.totalRows;
			this.dataList = res?.list?.map((item: any) => {
    	return new backSeverancePayList().deserialize(item)
			});
			console.log(this.dataList);

		}, async (error: any) => {
      this.loaded=false


			this.global.showError(error);
		});
	}

  pageChange($event: any) {

		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		// this.getData();
	}
 

}
