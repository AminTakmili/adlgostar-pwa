import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessReportPayrollPage } from './business-report-payroll.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessReportPayrollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessReportPayrollPageRoutingModule {}
