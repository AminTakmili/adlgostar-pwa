import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreEmployeePostsAddComponent } from './more-employee-posts-add/more-employee-posts-add.component';
import { MoreEmployeePostsEditComponent } from './more-employee-posts-edit/more-employee-posts-edit.component';
import { MoreEmployeePostsListComponent } from './more-employee-posts-list/more-employee-posts-list.component';


const routes: Routes = [
  {
    path: '',
    component: MoreEmployeePostsListComponent
  },
  {
    path: 'add',
    component: MoreEmployeePostsAddComponent
  },
  {
    path: 'edit/:id',
    component: MoreEmployeePostsEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreEmployeePostsPageRoutingModule {}
