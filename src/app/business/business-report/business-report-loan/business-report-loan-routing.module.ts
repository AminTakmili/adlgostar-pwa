import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessReportLoanPage } from './business-report-loan.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessReportLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessReportLoanPageRoutingModule {}
