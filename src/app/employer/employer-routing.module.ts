import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerAddComponent } from './employer-add/employer-add.component';
import { EmployerDetailComponent } from './employer-detail/employer-detail.component';
import { EmployerEditComponent } from './employer-edit/employer-edit.component';
import { EmployerListComponent } from './employer-list/employer-list.component';



const routes: Routes = [
  {
    path: '',
    component: EmployerListComponent
  },
  {
    path: 'add',
    component: EmployerAddComponent
  },
  {
    path: 'edit/:id',
    component: EmployerEditComponent
  },
  {
    path: 'detail/:id',
    component: EmployerDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerPageRoutingModule {}
