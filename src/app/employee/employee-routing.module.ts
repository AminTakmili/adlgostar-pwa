import { RouterModule, Routes } from '@angular/router';

import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeImporterComponent } from './employee-importer/employee-importer.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'add',
    component: EmployeeAddComponent
  },
  {
    path: 'add/:businessId',
    component: EmployeeAddComponent
  },
  {
    path: 'edit/:id',
    component: EmployeeEditComponent
  },
  {
    path: 'detail/:id',
    component: EmployeeDetailComponent
  },
  {
    path: 'importer',
    component: EmployeeImporterComponent
  },
  {
    path: 'leave',
    loadChildren: () => import('./employee-leave/employee-leave.module').then( m => m.EmployeeLeavePageModule)
  },
  {
    path: 'loan',
    loadChildren: () => import('./employee-loan/employee-loan.module').then( m => m.EmployeeLoanPageModule)
  },


 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule {}
