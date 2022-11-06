import { BusinessReportLoanComponent } from './business-report-loan/business-report-loan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/businesses',
		pathMatch: 'full',
	},
	{
		path: 'loan',
		redirectTo: '/businesses',
		pathMatch: 'full',
	},
	{
		path: 'loan/:id',
		component: BusinessReportLoanComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'Loan/:id',
		redirectTo: 'loan/:id',
		pathMatch: 'prefix',
	},
	// leave
	{
		path: 'leave/:id',
		loadChildren: () =>
			import('./business-report-leave/business-report-leave.module').then(
				(m) => m.BusinessReportLeavePageModule
			),
			pathMatch: 'prefix',
	},
	{
		path: 'leave',
		redirectTo: '/businesses',
		pathMatch: 'full',
	},
	
	{
		path: 'Leave/:id',
		redirectTo: 'leave/:id',
		pathMatch: 'prefix',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BusinessReportPageRoutingModule {}
