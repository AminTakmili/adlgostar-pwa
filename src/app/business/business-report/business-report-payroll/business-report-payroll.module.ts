import { BusinessReportPayrollDelayedpayrolComponent } from './components/business-report-payroll-delayedpayrol/business-report-payroll-delayedpayrol.component';
import { BusinessReportPayrollPayrolltaxComponent } from './components/business-report-payroll-payrolltax/business-report-payroll-payrolltax.component';
import { BusinessReportPayrollPayrollseparatelydetailComponent } from './components/business-report-payroll-payrollseparatelydetail/business-report-payroll-payrollseparatelydetail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { HighchartsChartModule } from 'highcharts-angular';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessReportPayrollPageRoutingModule } from './business-report-payroll-routing.module';

import { BusinessReportPayrollPage } from './business-report-payroll.page';
import { BusinessReportPayrollSummarypayrollComponent } from './components/business-report-payroll-summarypayroll/business-report-payroll-summarypayroll.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BusinessReportPayrollPageRoutingModule,
		ShareModulePageModule,
		HighchartsChartModule,
		NgPersianDatepickerModule,
		ReactiveFormsModule,
		NgSelectModule,
	],
	declarations: [
		BusinessReportPayrollPage,
		BusinessReportPayrollSummarypayrollComponent,
    BusinessReportPayrollPayrollseparatelydetailComponent,
    BusinessReportPayrollPayrolltaxComponent,
    BusinessReportPayrollDelayedpayrolComponent
	],
})
export class BusinessReportPayrollPageModule {}
