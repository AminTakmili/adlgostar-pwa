import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PayrollDeductionAddComponent } from './payroll-deduction-add/payroll-deduction-add.component';
import { PayrollDeductionEditComponent } from './payroll-deduction-edit/payroll-deduction-edit.component';
import { PayrollDeductionListComponent } from './payroll-deduction-list/payroll-deduction-list.component';

// import { PayrollBaseInfoPayrollDeductionPage } from './payroll-base-info-payroll-deduction.page';

const routes: Routes = [
  {
    path: '',
  redirectTo:'list'
  },
  {
    path: 'list',
    component: PayrollDeductionListComponent
  },
  {
    path: 'add',
    component: PayrollDeductionAddComponent
  },
  {
    path: 'edit/:id',
    component: PayrollDeductionEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollBaseInfoPayrollDeductionPageRoutingModule {}
