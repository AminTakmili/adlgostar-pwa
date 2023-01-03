import { BusinessReportLoanWorkinghourcountComponent } from './business-report-loan-workinghourcount/business-report-loan-workinghourcount.component';
import { BusinessReportNewyeargiftandbonusComponent } from './business-report-newyeargiftandbonus/business-report-newyeargiftandbonus.component';
import { BusinessReportInsuranceComponent } from './business-report-insurance/business-report-insurance.component';
import { BusinessReportSeverancepayComponent } from './business-report-severancepay/business-report-severancepay.component';
import { BusinessReportMonthlywageComponent } from './business-report-monthlywage/business-report-monthlywage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkingovertimeComponent } from './workingovertime/workingovertime.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/businesses',
		pathMatch: 'full',
	},
	{
		path: 'loan',
		loadChildren: () => import('./business-report-loan/business-report-loan.module').then( m => m.BusinessReportLoanPageModule),
		pathMatch: 'full',
	},
	{
		path: 'loan/:id',
		loadChildren: () => import('./business-report-loan/business-report-loan.module').then( m => m.BusinessReportLoanPageModule),
		pathMatch: 'prefix',
	},
	{
		path: 'Loan/:id',
		redirectTo: 'loan/:id',
		pathMatch: 'prefix',
	},
	// wage
	{
		path: 'wage',
		// redirectTo: '/businesses',
		component: BusinessReportMonthlywageComponent,

		pathMatch: 'full',
	},
	{
		path: 'wage/:id',
		component: BusinessReportMonthlywageComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'Wage/:id',
		redirectTo: 'wage/:id',
		pathMatch: 'prefix',
	},
	// severance
	{
		path: 'severance',
		component: BusinessReportSeverancepayComponent,
		pathMatch: 'full',
	},
	{
		path: 'severance/:id',
		component: BusinessReportSeverancepayComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'Severance/:id',
		redirectTo: 'severance/:id',
		pathMatch: 'prefix',
	},
	// insurance
	{
		path: 'insurance',
		component: BusinessReportInsuranceComponent,
		pathMatch: 'full',
	},
	{
		path: 'insurance/:id',
		component: BusinessReportInsuranceComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'Insurance/:id',
		redirectTo: 'insurance/:id',
		pathMatch: 'prefix',
	},
	
	// workingHOURE
	{
		path: 'workinghour',
		loadChildren: () => import('./business-report-workinghour/business-report-workinghour.module').then( m => m.BusinessReportWorkinghourPageModule),
		pathMatch: 'full',
	},
	{
		path: 'workinghour/:id',
		loadChildren: () => import('./business-report-workinghour/business-report-workinghour.module').then( m => m.BusinessReportWorkinghourPageModule),
		pathMatch: 'prefix',
	},
	{
		path: 'Workinghour/:id',
		redirectTo: 'workinghour/:id',
		pathMatch: 'prefix',
	},
	// // workingovertime
	// {
	// 	path: 'workingovertime',
	// 	redirectTo: '/businesses',
	// 	pathMatch: 'full',
	// },
	// {
	// 	path: 'workingovertime/:id',
	// 	component: WorkingovertimeComponent,
	// 	pathMatch: 'prefix',
	// },
	// {
	// 	path: 'Workingovertime/:id',
	// 	redirectTo: 'workingovertime/:id',
	// 	pathMatch: 'prefix',
	// },
	
	// newyeargift_bonus
	{
		path: 'newyeargift_bonus',
		component: BusinessReportNewyeargiftandbonusComponent,
		pathMatch: 'full',
	},
	{
		path: 'newyeargift_bonus/:id',
		component: BusinessReportNewyeargiftandbonusComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'Newyeargift_bonus/:id',
		redirectTo: 'newyeargift_bonus/:id',
		pathMatch: 'prefix',
	},
	{
		path: 'Newyeargift_Bonus/:id',
		redirectTo: 'newyeargift_bonus/:id',
		pathMatch: 'prefix',
	},
	{
		path: 'newyeargiftbonus/:id',
		redirectTo: 'newyeargift_bonus/:id',
		pathMatch: 'prefix',
	},
	// workinghourcount
	{
		path: 'workinghourcount',
		component: BusinessReportLoanWorkinghourcountComponent,
		pathMatch: 'full',
	},
	{
		path: 'workinghourcount/:id',
		component: BusinessReportLoanWorkinghourcountComponent,
		pathMatch: 'prefix',
	},
	{
		path: 'Workinghourcount/:id',
		redirectTo: 'workinghourcount/:id',
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
		loadChildren: () =>
		import('./business-report-leave/business-report-leave.module').then(
			(m) => m.BusinessReportLeavePageModule
		),
				pathMatch: 'full',
	},
	
	{
		path: 'Leave/:id',
		redirectTo: 'leave/:id',
		pathMatch: 'prefix',
	},
	// payroll
  {
    path: 'payroll/:id',
    loadChildren: () => import('./business-report-payroll/business-report-payroll.module').then( m => m.BusinessReportPayrollPageModule)
  },
  {
	path: 'payroll',
	// redirectTo: '/businesses',
	loadChildren: () => import('./business-report-payroll/business-report-payroll.module').then( m => m.BusinessReportPayrollPageModule),

	pathMatch: 'full',
},

{
	path: 'Payroll/:id',
	redirectTo: 'payroll/:id',
	pathMatch: 'prefix',
},
//   {
//     path: 'business-report-workinghour',
//     loadChildren: () => import('./business-report-workinghour/business-report-workinghour.module').then( m => m.BusinessReportWorkinghourPageModule)
//   },

//   {
//     path: 'business-report-loan',
//     loadChildren: () => import('./business-report-loan/business-report-loan.module').then( m => m.BusinessReportLoanPageModule)
//   },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BusinessReportPageRoutingModule {}
