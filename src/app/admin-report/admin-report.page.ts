import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.page.html',
  styleUrls: ['./admin-report.page.scss'],
})
export class AdminReportPage implements OnInit {
  pageTitle:string='گزارشات ادمین'
  constructor() { }

  ngOnInit() {
  }

}
