import { payrolDetail } from './../../../core/models/payroll-list.model';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from './../../../core/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-list-detail',
  templateUrl: './payroll-list-detail.component.html',
  styleUrls: ['./payroll-list-detail.component.scss'],
})
export class PayrollListDetailComponent implements OnInit {
  pageTitle='جزیات فیش حقوقی'
  id:string
  dataObject:payrolDetail
  constructor(
    private global:GlobalService,
    private rout:ActivatedRoute,
  ) { 

    this.id=rout.snapshot.paramMap.get('id')
  }

  ngOnInit() {}
  async ionViewWillEnter() {
    this.getData()
  }
  async getData(){
    await this.global.showLoading()
    this.global.httpPost('payroll/detail',{id:this.id}).subscribe(
     async (res:any) => {
      await this.global.dismisLoading()

      console.log(res.list[0]);
      let domy =res.list[0]
     
     domy['month']=res.month
     domy['year']=res.year
      console.log(domy);
      this.dataObject= new payrolDetail().deserialize(domy)
      console.log(this.dataObject);
     },
     async (error:any) => {
      await this.global.dismisLoading()
      await this.global.showError(error)

     }
    )

  }

	 printContract(id: string) {

		const printContent = document.getElementById(id);
		const WindowPrt = window.open('', '', 'left=1,top=1,width=900,height=900,toolbar=1,scrollbars=1,status=1');
		// WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="/assets/css/print.css" />');
		WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="/assets/css/preview-payroll.css" />');
		WindowPrt.document.write(printContent.innerHTML);
		WindowPrt.document.close();

		setTimeout(() => {
			WindowPrt.focus();
			WindowPrt.print();
			WindowPrt.close();
		}, 500);

	}


}
