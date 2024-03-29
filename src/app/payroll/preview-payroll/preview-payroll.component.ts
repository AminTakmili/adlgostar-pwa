import { payrolDetail } from './../../core/models/payroll-list.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-payroll',
  templateUrl: './preview-payroll.component.html',
  styleUrls: ['./preview-payroll.component.scss'],
})
export class PreviewPayrollComponent implements OnInit {
@Input('list')list:payrolDetail
  constructor(
    public global:GlobalService
  ) { }

  ngOnInit() {}

}
