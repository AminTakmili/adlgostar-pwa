import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreBasicYearsComponent } from './more-basic-years/more-basic-years.component';
import { MoreCalcBasicYearsComponent } from './more-calc-basic-years/more-calc-basic-years.component';
import { MoreExtraSalaryItemComponent } from './more-extra-salary-item/more-extra-salary-item.component';
import { MoreMinimumDailyWageComponent } from './more-minimum-daily-wage/more-minimum-daily-wage.component';
import { MoreSalaryConstantsComponent } from './more-salary-constants/more-salary-constants.component';



const routes: Routes = [
	{
		path: 'basic-years',
		component: MoreBasicYearsComponent
	},
	{
		path: 'calc-basic-years',
		component:MoreCalcBasicYearsComponent
	},
	{
		path: 'extra-salary-item',
		component:MoreExtraSalaryItemComponent
	},
	{
		path: 'minimum-daily-wage',
		component:MoreMinimumDailyWageComponent
	},
	{
		path: 'salary-constants',
		component: MoreSalaryConstantsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MorePageRoutingModule { }
