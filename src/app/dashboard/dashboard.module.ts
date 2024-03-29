import { DashboardUnconfirmedContractsComponent } from './components/dashboard-unconfirmed-contracts/dashboard-unconfirmed-contracts.component';
import { DashboardEmployeePieChartComponent } from './components/dashboard-employee-pie-chart/dashboard-employee-pie-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { DashboardBookmarkComponent } from './components/dashboard-bookmark/dashboard-bookmark.component';
import { DashboardNotepadComponent } from './components/dashboard-notepad/dashboard-notepad.component';
import { DashboardLatestBirthdayComponent } from './components/dashboard-latest-birthday/dashboard-latest-birthday.component';
import { DashboardExpireContractsComponent } from './components/dashboard-expire-contracts/dashboard-expire-contracts.component';
import { DashboardNocontractEmployeeComponent } from './components/dashboard-nocontract-employee/dashboard-nocontract-employee.component';
import { DashboardNearestBirthdayComponent } from './components/dashboard-nearest-birthday/dashboard-nearest-birthday.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardUnconfirmedPayrollsComponent } from './components/dashboard-unconfirmed-payrolls/dashboard-unconfirmed-payrolls.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		DashboardPageRoutingModule,
		ShareModulePageModule,
		HighchartsChartModule

	],
	declarations: [
		DashboardPageComponent,
		DashboardBookmarkComponent,
		DashboardNotepadComponent,
		DashboardLatestBirthdayComponent,
		DashboardExpireContractsComponent,
		DashboardNocontractEmployeeComponent,
		DashboardNearestBirthdayComponent,
		DashboardEmployeePieChartComponent,
		DashboardUnconfirmedContractsComponent,
		DashboardUnconfirmedPayrollsComponent
		
	],
	entryComponents: [
		DashboardBookmarkComponent,
		DashboardNotepadComponent,
		DashboardLatestBirthdayComponent,
		DashboardExpireContractsComponent,
		DashboardNocontractEmployeeComponent,
		DashboardNearestBirthdayComponent

	]
})
export class DashboardPageModule { }
