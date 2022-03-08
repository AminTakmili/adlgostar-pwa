import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersAllAddComponent } from './users-all-add/users-all-add.component';
import { UsersAllEditComponent } from './users-all-edit/users-all-edit.component';
import { UsersAllListComponent } from './users-all-list/users-all-list.component';


const routes: Routes = [
  {
    path: '',
    component: UsersAllListComponent
  },
  {
    path: 'add',
    component: UsersAllAddComponent
  },
  {
    path: 'edit/:id',
    component: UsersAllEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersAllPageRoutingModule {}
