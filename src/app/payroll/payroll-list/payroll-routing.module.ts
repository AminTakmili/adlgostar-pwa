import { PayrollListNewAddComponent } from './payroll-list-new-add/payroll-list-new-add.component';
import { PayrollListEditComponent } from './payroll-list-edit/payroll-list-edit.component';
import { PayrollListListComponent } from './payroll-list-list/payroll-list-list.component';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PayrollListAddComponent } from './payroll-list-add/payroll-list-add.component';

// import { PayrollListPage } from './payroll-list.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list'
  },
  {
    path: 'list',
    component: PayrollListListComponent
  },
  {
    path: 'add',
    component: PayrollListNewAddComponent
  },
  {
    path: 'edit/:id',
    component: PayrollListEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollListPageRoutingModule {}
