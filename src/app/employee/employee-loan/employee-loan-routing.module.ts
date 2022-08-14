import { RouterModule, Routes } from '@angular/router';

import { EmployeeLoanAddComponent } from './employee-loan-add/employee-loan-add.component';
import { EmployeeLoanEditComponent } from './employee-loan-edit/employee-loan-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'add/:id',
    component: EmployeeLoanAddComponent
  },
  {
    path: 'edit/:bEmId/:id',
    component: EmployeeLoanEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeLoanPageRoutingModule {}
