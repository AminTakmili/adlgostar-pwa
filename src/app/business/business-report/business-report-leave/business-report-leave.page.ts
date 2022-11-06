import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-report-leave',
  templateUrl: './business-report-leave.page.html',
  styleUrls: ['./business-report-leave.page.scss'],
})
export class BusinessReportLeavePage implements OnInit {
  pageTitle:string='گزارش های مرخصی'
  businessId:string

  constructor(
    private rout: ActivatedRoute,
  ) { 
    this.businessId = rout.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
