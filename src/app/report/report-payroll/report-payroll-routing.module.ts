import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ReportPayrollMonthlywageComponent } from './report-payroll-monthlywage/report-payroll-monthlywage.component';
import { ReportPayrollRemainingleaveComponent } from './report-payroll-remainingleave/report-payroll-remainingleave.component';
import { ReportPayrollSeverancepayListComponent } from './report-payroll-severancepay-list/report-payroll-severancepay-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'monthlyWage'
  },
  {
    path: 'remainingLeave',
    component: ReportPayrollRemainingleaveComponent
  },
  {
    path: 'monthlyWage',
    component: ReportPayrollMonthlywageComponent
  },
  {
    path: 'severancePayList',
    component: ReportPayrollSeverancepayListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPayrollPageRoutingModule {}
