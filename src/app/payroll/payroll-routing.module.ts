import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

// import { PayrollPage } from './payroll.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'payroll_base_info'
  },
  {
    path: 'payroll',
    loadChildren: () => import('./payroll-list/payroll.module').then( m => m.PayrollListPageModule),
    
  },
  {
    path: 'payroll_base_info',
    loadChildren: () => import('./payroll-base-info/payroll-base-info.module').then( m => m.PayrollBaseInfoPageModule),
    pathMatch:'prefix' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollPageRoutingModule {}
