import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './core/guards/login.guard';
import { NgModule } from '@angular/core';
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
		loadChildren: () => import('./contract/contract.module').then(m => m.ContractPageModule),
		canActivate: [LoginGuard]
	},
	{
		path: 'employers',
		loadChildren: () => import('./employer/employer.module').then(m => m.EmployerPageModule),
		canActivate: [LoginGuard]
	},
	{
		path: 'employees',
		loadChildren: () => import('./employee/employee.module').then(m => m.EmployeePageModule),
		canActivate: [LoginGuard]
	},
	{
		path: 'more',
		loadChildren: () => import('./more/more.module').then(m => m.MorePageModule),
		canActivate: [LoginGuard]
	},
	{
		path: 'users',
		loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule),
		canActivate: [LoginGuard]
	},

	{
		path: 'profile',
		loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
		canActivate: [LoginGuard]
	},
	{
		path: 'test',
		loadChildren: () => import('./test/test.module').then(m => m.TestPageModule),
		canActivate: [LoginGuard]
	},
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule),
	canActivate: [LoginGuard]
  },
  {
    path: 'payrolls',
    loadChildren: () => import('./payroll/payroll.module').then( m => m.PayrollPageModule),
	canActivate: [LoginGuard],
	 pathMatch:'prefix' 
	
  },
  {
    path: 'settlement',
    loadChildren: () => import('./settlement/settlement.module').then( m => m.SettlementPageModule),
		canActivate: [LoginGuard],
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule),
		canActivate: [LoginGuard],
  },
  {
    path: 'setting',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
		canActivate: [LoginGuard],
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then( m => m.MediaPageModule),
	canActivate: [LoginGuard],

  },
  {
    path: 'recognizance',
    loadChildren: () => import('./recognizance/recognizance.module').then( m => m.RecognizancePageModule),
	canActivate: [LoginGuard],

  },
  {
    path: 'form',
   redirectTo:'form/template'

  },
  {
    path: 'form/template',
    loadChildren: () => import('./form-template/form-template.module').then( m => m.FormTemplatePageModule),
	canActivate: [LoginGuard],

  },
 



 



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
