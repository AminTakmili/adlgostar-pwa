import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { NotLoginGuard } from './core/guards/not-login.guard';

const routes: Routes = [
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
		canActivate: [NotLoginGuard]
	},
	{
		path: '',
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
		canActivate: [LoginGuard]
	},
	{
		path: 'businesses',
		loadChildren: () => import('./business/business.module').then(m => m.BusinessPageModule),
		canActivate: [LoginGuard]
	},
	{
		path: 'contracts',
		loadChildren: () => import('./contract/contract.module').then(m => m.ContractPageModule)
	},
	{
		path: 'employers',
		loadChildren: () => import('./employer/employer.module').then(m => m.EmployerPageModule)
	},
	{
		path: 'employees',
		loadChildren: () => import('./employee/employee.module').then(m => m.EmployeePageModule)
	},
	{
		path: 'more',
		loadChildren: () => import('./more/more.module').then(m => m.MorePageModule)
	},
	{
		path: 'users',
		loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
	},

	// {
	// 	path: 'profile',
	// 	loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
	// 	canActivate: [LoginGuard]
	// },
	// {
	// 	path: '',
	// 	redirectTo: 'home',
	// 	pathMatch: 'full'
	// },

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
