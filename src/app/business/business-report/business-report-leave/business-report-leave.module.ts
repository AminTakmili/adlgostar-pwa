import { BusinessReportLeavePaidleaveComponent } from './components/business-report-leave-paidleave/business-report-leave-paidleave.component';
import { BusinessReportLeaveUnusedleaveComponent } from './components/business-report-leave-unusedleave/business-report-leave-unusedleave.component';
import { BusinessReportLeaveUsedleaveComponent } from './components/business-report-leave-usedleave/business-report-leave-usedleave.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { HighchartsChartModule } from 'highcharts-angular';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { BusinessReportLeaveRemainingleaveComponent } from './components/business-report-leave-remainingleave/business-report-leave-remainingleave.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessReportLeavePageRoutingModule } from './business-report-leave-routing.module';

import { BusinessReportLeavePage } from './business-report-leave.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BusinessReportLeavePageRoutingModule,
		ShareModulePageModule,
		HighchartsChartModule,
		NgPersianDatepickerModule,
		ReactiveFormsModule,
		NgSelectModule,
	],
	declarations: [
		BusinessReportLeavePage,
		BusinessReportLeaveRemainingleaveComponent,
		BusinessReportLeaveUsedleaveComponent,
    BusinessReportLeaveUnusedleaveComponent,
    BusinessReportLeavePaidleaveComponent
	],
})
export class BusinessReportLeavePageModule {}
