import { PayrollTaxEditComponent } from './payroll-tax-edit/payroll-tax-edit.component';
import { PayrollTaxAddComponent } from './payroll-tax-add/payroll-tax-add.component';
import { PayrollTaxListComponent } from './payroll-tax-list/payroll-tax-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { PayrollBaseInfoPayrollTaxPage } from './payroll-base-info-payroll-tax.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PayrollBaseInfoPayrollTaxPage
  // }
  {
    path: 'list',
    component: PayrollTaxListComponent
  },
  {
    path: 'add',
    component: PayrollTaxAddComponent
  },
  {
    path: 'edit/:id',
    component: PayrollTaxEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollBaseInfoPayrollTaxPageRoutingModule {}
