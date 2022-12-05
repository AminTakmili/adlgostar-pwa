import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessReportLeavePage } from './business-report-leave.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessReportLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessReportLeavePageRoutingModule {}
