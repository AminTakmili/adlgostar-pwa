import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerAddComponent } from './employer-add/employer-add.component';
import { EmployerDetailComponent } from './employer-detail/employer-detail.component';
import { EmployerEditComponent } from './employer-edit/employer-edit.component';
import { EmployerImporterComponent } from './employer-importer/employer-importer.component';
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
  {
    path: 'importer',
    component: EmployerImporterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerPageRoutingModule {}
