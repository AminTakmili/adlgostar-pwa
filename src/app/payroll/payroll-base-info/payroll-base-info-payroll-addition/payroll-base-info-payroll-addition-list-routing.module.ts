import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PayrollAdditionAddComponent } from './payroll-addition-add/payroll-addition-add.component';
import { PayrollAdditionEditComponent } from './payroll-addition-edit/payroll-addition-edit.component';
import { PayrollAdditionListComponent } from './payroll-addition-list/payroll-addition-list.component';

const routes: Routes = [
  {
    path: '',
    // component: PayrollBaseInfoPayrollAdditionListPage
    redirectTo:'list'
  },

  {
    path: 'list',
    component: PayrollAdditionListComponent
  },

  {
    path: 'add',
    component: PayrollAdditionAddComponent
  },
  {
    path: 'edit/:id',
    component: PayrollAdditionEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollBaseInfoPayrollAdditionListPageRoutingModule {}
