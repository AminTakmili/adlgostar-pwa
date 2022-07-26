import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { PayrollBaseInfoPayrollAdditionListPage } from './payroll-base-info-payroll-addition-list.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PayrollBaseInfoPayrollAdditionListPage
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollBaseInfoPayrollAdditionListPageRoutingModule {}
