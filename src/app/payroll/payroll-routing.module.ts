import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SettlementListComponent } from '../settlement/settlement-list/settlement-list.component';

// import { PayrollPage } from './payroll.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'settlement/list'
  },
  {
    path: 'payroll',
    loadChildren: () => import('./payroll-list/payroll.module').then( m => m.PayrollListPageModule),
    
  },
  {
    path: 'settlement/list',
   redirectTo:'/settlement/list'
    
  },
  {
    path: 'payroll_base_info',
    loadChildren: () => import('./payroll-base-info/payroll-base-info.module').then( m => m.PayrollBaseInfoPageModule),
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollPageRoutingModule {}
