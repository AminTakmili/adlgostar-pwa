import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersRoleAddComponent } from './users-role-add/users-role-add.component';
import { UsersRoleEditComponent } from './users-role-edit/users-role-edit.component';
import { UsersRoleListComponent } from './users-role-list/users-role-list.component';


const routes: Routes = [
	{
		path: '',
		component: UsersRoleListComponent
	},
	{
		path: 'add',
		component: UsersRoleAddComponent
	},
	{
		path: 'edit/:id',
		component: UsersRoleEditComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsersRolePageRoutingModule { }
