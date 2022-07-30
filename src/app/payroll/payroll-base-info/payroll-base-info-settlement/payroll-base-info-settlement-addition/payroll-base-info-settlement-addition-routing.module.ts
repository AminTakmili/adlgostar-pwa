import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PayrollSettlementAdditionAddComponent } from './payroll-settlement-addition-add/payroll-settlement-addition-add.component';
import { PayrollSettlementAdditionEditComponent } from './payroll-settlement-addition-edit/payroll-settlement-addition-edit.component';
import { PayrollSettlementAdditionListComponent } from './payroll-settlement-addition-list/payroll-settlement-addition-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list'
  },
  {
    path: 'edit',
    redirectTo:'list'
  },
  {
    path: 'list',
    component: PayrollSettlementAdditionListComponent
  },
  {
    path: 'add',
    component: PayrollSettlementAdditionAddComponent
  },
  {
    path: 'edit/:id',
    component: PayrollSettlementAdditionEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollBaseInfoSettlementAdditionPageRoutingModule {}
