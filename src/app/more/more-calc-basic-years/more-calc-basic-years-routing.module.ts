import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreCalcBasicYearsAddComponent } from './more-calc-basic-years-add/more-calc-basic-years-add.component';
import { MoreCalcBasicYearsEditComponent } from './more-calc-basic-years-edit/more-calc-basic-years-edit.component';
import { MoreCalcBasicYearsListComponent } from './more-calc-basic-years-list/more-calc-basic-years-list.component';


const routes: Routes = [
  {
    path: '',
    component: MoreCalcBasicYearsListComponent
  },
  {
    path: 'add',
    component: MoreCalcBasicYearsAddComponent
  },
  {
    path: 'edit/:id',
    component: MoreCalcBasicYearsEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreCalcBasicYearsPageRoutingModule {}
