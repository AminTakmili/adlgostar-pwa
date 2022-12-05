import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-report-payroll',
  templateUrl: './business-report-payroll.page.html',
  styleUrls: ['./business-report-payroll.page.scss'],
})
export class BusinessReportPayrollPage implements OnInit {
  pageTitle:string='گزارشات فیش حقوقی'
  businessId:string

  constructor(
    private rout: ActivatedRoute,
  ) { 
    this.businessId = rout.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
