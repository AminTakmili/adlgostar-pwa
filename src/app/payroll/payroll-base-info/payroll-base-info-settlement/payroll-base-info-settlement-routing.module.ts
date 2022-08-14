import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',

    redirectTo:'deduction'
  },
  {
    path: 'template',
    loadChildren: () => import('./payroll-settlement-template/payroll-settlement-template.module').then( m => m.PayrollSettlementTemplatePageModule)
  },
  {
    path: 'addition',
    loadChildren: () => import('./payroll-base-info-settlement-addition/payroll-base-info-settlement-addition.module').then( m => m.PayrollBaseInfoSettlementAdditionPageModule)
  },
  {
    path: 'deduction',
    loadChildren: () => import('./payroll-base-info-settlement-deduction/payroll-base-info-settlement-deduction.module').then( m => m.PayrollBaseInfoSettlementDeductionPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollBaseInfoSettlementPageRoutingModule {}
