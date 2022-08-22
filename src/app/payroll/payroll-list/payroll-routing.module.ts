import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PayrollListAddComponent } from './payroll-list-add/payroll-list-add.component';

// import { PayrollListPage } from './payroll-list.page';

const routes: Routes = [
  {
    path: '',
    // component: PayrollListPage
    redirectTo:'add'
  },
  {
    path: 'add',
    component: PayrollListAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollListPageRoutingModule {}
