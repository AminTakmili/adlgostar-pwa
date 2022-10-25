import { EmployeeFormEditComponent } from './employee-form-edit/employee-form-edit.component';
import { EmployeeFormAddComponent } from './employee-form-add/employee-form-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    // component: EmployeeFormPage
  },
  {
    path: 'add',
    redirectTo: '/employees',
    pathMatch:'full'
  },
  {
    path: 'add/:businessEmployeeId',
    component: EmployeeFormAddComponent
  },
  {
    path: 'edit',
    redirectTo: '/employees',
    pathMatch:'full'
  },
  {
    path: 'edit/:businessEmployeeId',
    redirectTo: '/employees',
    pathMatch:'full'
    },
  {
    path: 'edit/:businessEmployeeId/:id',
    component: EmployeeFormEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeFormPageRoutingModule {}
