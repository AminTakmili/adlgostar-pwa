import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { PayrollPage } from './payroll.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'payroll_base_info'
  },
  {
    path: 'payroll-list',
    loadChildren: () => import('./payroll-list/payroll-list.module').then( m => m.PayrollListPageModule)
  },
  {
    path: 'payroll_base_info',
    loadChildren: () => import('./payroll-base-info/payroll-base-info.module').then( m => m.PayrollBaseInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollPageRoutingModule {}
