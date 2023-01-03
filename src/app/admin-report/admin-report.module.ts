import { AdminReportInactivecontractComponent } from './components/admin-report-inactivecontract/admin-report-inactivecontract.component';
import { AdminReportActivecontractComponent } from './components/admin-report-activecontract/admin-report-activecontract.component';
import { ShareModulePageModule } from './../share-module/share-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminReportPageRoutingModule } from './admin-report-routing.module';

import { AdminReportPage } from './admin-report.page';
import { AdminReportExpertlistComponent } from './components/admin-report-expertlist/admin-report-expertlist.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AdminReportPageRoutingModule,

		ShareModulePageModule,
	],
	declarations: [
		AdminReportPage,
		AdminReportExpertlistComponent,
		AdminReportActivecontractComponent,
		AdminReportInactivecontractComponent,
	],
})
export class AdminReportPageModule {}
