import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { PayrollListPage } from './payroll-list.page';

const routes: Routes = [
  {
    path: '',
    // component: PayrollListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollListPageRoutingModule {}
