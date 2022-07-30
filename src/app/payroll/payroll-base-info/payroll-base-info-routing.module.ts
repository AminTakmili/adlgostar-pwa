import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

// import { PayrollBaseInfoPage } from './payroll-base-info.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'settlement'
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
    path: 'payroll_addition',
    loadChildren: () => import('./payroll-base-info-payroll-addition/payroll-base-info-payroll-addition-list.module').then( m => m.PayrollBaseInfoPayrollAdditionListPageModule)
  },
  {
    path: 'payroll_deduction',
    loadChildren: () => import('./payroll-base-info-payroll-deduction/payroll-base-info-payroll-deduction.module').then( m => m.PayrollBaseInfoPayrollDeductionPageModule)
  },
  {
    path: 'settlement',
    loadChildren: () => import('./payroll-base-info-settlement/payroll-base-info-settlement.module').then( m => m.PayrollBaseInfoSettlementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollBaseInfoPageRoutingModule {}
