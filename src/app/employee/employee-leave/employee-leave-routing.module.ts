import { RouterModule, Routes } from '@angular/router';

import { EmployeeLeaveAddComponent } from './employee-leave-add/employee-leave-add.component';
import { EmployeeLeaveEditComponent } from './employee-leave-edit/employee-leave-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [

  {
    path: 'add/:id',
    component: EmployeeLeaveAddComponent
  },
  {
    path: 'edit/:business_employee_id/:id',
    component: EmployeeLeaveEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeLeavePageRoutingModule {}
