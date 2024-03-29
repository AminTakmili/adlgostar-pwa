import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
	{
		path: 'basic-years',
		loadChildren: () => import('./more-basic-years/more-basic-years.module').then(m => m.MoreBasicYearsPageModule)
	},
	{
		path: 'minimum-daily-wage',
		loadChildren: () => import('./more-minimum-daily-wage/more-minimum-daily-wage.module').then(m => m.MoreMinimumDailyWagePageModule)
	},
	{
		path: 'calc-basic-years',
		loadChildren: () => import('./more-calc-basic-years/more-calc-basic-years.module').then(m => m.MoreCalcBasicYearsPageModule)
	},
	{
		path: 'extra-salary-item',
		loadChildren: () => import('./more-extra-salary-item/more-extra-salary-item.module').then(m => m.MoreExtraSalaryItemPageModule)
	},
	{
		path: 'salary-constants',
		loadChildren: () => import('./more-salary-constants/more-salary-constants.module').then(m => m.MoreSalaryConstantsPageModule)
	},
	{
		path: 'business-category',
		loadChildren: () => import('./more-business-category/more-business-category.module').then(m => m.MoreBusinessCategoryPageModule)
	},
	{
		path: 'employee-posts',
		loadChildren: () => import('./more-employee-posts/more-employee-posts.module').then(m => m.MoreEmployeePostsPageModule)
	},
	{
		path: 'bank',
		loadChildren: () => import('./more-bank/more-bank.module').then(m => m.MoreBankPageModule)
	}


];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MorePageRoutingModule { }
