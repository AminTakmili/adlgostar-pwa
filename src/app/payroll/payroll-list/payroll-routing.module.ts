import { PayrollListDetailComponent } from './payroll-list-detail/payroll-list-detail.component';
import { PayrollListNewEditComponent } from './payroll-list-new-edit/payroll-list-new-edit.component';
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
    path: 'edit',
    component: PayrollListNewEditComponent
  },
  {
    path: 'detail',
    redirectTo: 'list'
  },
  {
    path: 'detail/:id',
    component: PayrollListDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollListPageRoutingModule {}
