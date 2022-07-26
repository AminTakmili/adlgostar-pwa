import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { PayrollBaseInfoPage } from './payroll-base-info.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'payroll_tax/list'
  },
  {
  
    path: 'working_hour',
    loadChildren: () => import('./payroll-base-info-working-hour/payroll-base-info-working-hour.module').then( m => m.WorkingHourPageModule)
  },
  {
    path: 'payroll_tax',
    loadChildren: () => import('./payroll-base-info-payroll-tax/payroll-base-info-payroll-tax.module').then( m => m.PayrollBaseInfoPayrollTaxPageModule)
  },
  {
    path: 'payroll-base-info-payroll-addition-list',
    loadChildren: () => import('./payroll-base-info-payroll-addition-list/payroll-base-info-payroll-addition-list.module').then( m => m.PayrollBaseInfoPayrollAdditionListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollBaseInfoPageRoutingModule {}
