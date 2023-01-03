import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminReportPage } from './admin-report.page';

const routes: Routes = [
  {
    path: '',
    component: AdminReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminReportPageRoutingModule {}
