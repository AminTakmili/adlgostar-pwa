import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersTypeAddComponent } from './users-type-add/users-type-add.component';
import { UsersTypeEditComponent } from './users-type-edit/users-type-edit.component';
import { UsersTypeListComponent } from './users-type-list/users-type-list.component';



const routes: Routes = [
	{
		path: '',
		component: UsersTypeListComponent
	},
	{
		path: 'add',
		component: UsersTypeAddComponent
	},

	{
		path: 'edit/:id',
		component: UsersTypeEditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsersTypePageRoutingModule { }
