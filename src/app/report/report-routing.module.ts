import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
   redirectTo: 'payroll',
  },
  {
    path: 'payroll',
    loadChildren: () => import('./report-payroll/report-payroll.module').then( m => m.ReportPayrollPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPageRoutingModule {}
