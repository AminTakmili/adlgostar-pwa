import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreSalaryConstantsAddComponent } from './more-salary-constants-add/more-salary-constants-add.component';
import { MoreSalaryConstantsEditComponent } from './more-salary-constants-edit/more-salary-constants-edit.component';
import { MoreSalaryConstantsListComponent } from './more-salary-constants-list/more-salary-constants-list.component';


const routes: Routes = [
  {
    path: '',
    component: MoreSalaryConstantsListComponent
  },
  {
    path: 'add',
    component: MoreSalaryConstantsAddComponent
  },
  {
    path: 'edit/:id',
    component: MoreSalaryConstantsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreSalaryConstantsPageRoutingModule {}
