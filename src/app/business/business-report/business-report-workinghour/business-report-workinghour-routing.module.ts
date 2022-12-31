import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessReportWorkinghourPage } from './business-report-workinghour.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessReportWorkinghourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessReportWorkinghourPageRoutingModule {}
