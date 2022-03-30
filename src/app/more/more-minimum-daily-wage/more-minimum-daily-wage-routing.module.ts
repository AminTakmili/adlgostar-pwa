import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreMinimumDailyWageAddComponent } from './more-minimum-daily-wage-add/more-minimum-daily-wage-add.component';
import { MoreMinimumDailyWageEditComponent } from './more-minimum-daily-wage-edit/more-minimum-daily-wage-edit.component';
import { MoreMinimumDailyWageListComponent } from './more-minimum-daily-wage-list/more-minimum-daily-wage-list.component';


const routes: Routes = [
	{
		path: '',
		component: MoreMinimumDailyWageListComponent
	},
	{
		path: 'add',
		component: MoreMinimumDailyWageAddComponent
	},
	{
		path: 'edit/:id',
		component: MoreMinimumDailyWageEditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MoreMinimumDailyWagePageRoutingModule { }
