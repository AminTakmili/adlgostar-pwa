import { BusinessReportWorkinghourWorkingnightComponent } from './components/business-report-workinghour-workingnight/business-report-workinghour-workingnight.component';
import { BusinessReportWorkinghourWorkingovertimeComponent } from './components/business-report-workinghour-workingovertime/business-report-workinghour-workingovertime.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessReportWorkinghourPageRoutingModule } from './business-report-workinghour-routing.module';

import { BusinessReportWorkinghourPage } from './business-report-workinghour.page';
import { BusinessReportWorkinghourWorkingFridayComponent } from './components/business-report-workinghour-working-friday/business-report-workinghour-working-friday.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BusinessReportWorkinghourPageRoutingModule,
    ShareModulePageModule,
		HighchartsChartModule,
		NgPersianDatepickerModule,
		ReactiveFormsModule,
		NgSelectModule,
	],
	declarations: [
		BusinessReportWorkinghourPage,
		BusinessReportWorkinghourWorkingFridayComponent,
    BusinessReportWorkinghourWorkingovertimeComponent,
    BusinessReportWorkinghourWorkingnightComponent
	],
})
export class BusinessReportWorkinghourPageModule {}
