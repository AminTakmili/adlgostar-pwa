import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSupportAddComponent } from './profile-support-add/profile-support-add.component';
import { ProfileSupportDetailComponent } from './profile-support-detail/profile-support-detail.component';
import { ProfileSupportListComponent } from './profile-support-list/profile-support-list.component';



const routes: Routes = [
	{
		path: '',
		component: ProfileSupportListComponent,
	},
	{
		path: 'add',
		component: ProfileSupportAddComponent,
	},
	{
		path: 'detail/:id',
		component: ProfileSupportDetailComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileSupportPageRoutingModule { }
