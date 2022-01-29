import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { NotLoginGuard } from './core/guards/not-login.guard';

const routes: Routes = [
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
		// canActivate : [NotLoginGuard]
	},
	{
		path: '',
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
		// canActivate : [LoginGuard]
	},
	{
		path: 'businesses',
		loadChildren: () => import('./business/business.module').then(m => m.BusinessPageModule)
	},
	// {
	// 	path: '',
	// 	redirectTo: 'home',
	// 	pathMatch: 'full'
	// },

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
