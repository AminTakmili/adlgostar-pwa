import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PayrollBaseInfoWorkingHourAddComponent } from './payroll-base-info-working-hour-add/payroll-base-info-working-hour-add.component';
import { PayrollBaseInfoWorkingHourEditComponent } from './payroll-base-info-working-hour-edit/payroll-base-info-working-hour-edit.component';
import { PayrollBaseInfoWorkingHourListComponent } from './payroll-base-info-working-hour-list/payroll-base-info-working-hour-list.component';

// import { WorkingHourPage } from './working-hour.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'list'
  },
  {
    path:'list',
    component:PayrollBaseInfoWorkingHourListComponent
  },
  {
    path:'add',
    component:PayrollBaseInfoWorkingHourAddComponent
  },
  {
    path:'edit/:id',
    component:PayrollBaseInfoWorkingHourEditComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkingHourPageRoutingModule {}
