import { BusinessReportLoanWorkinghourcountComponent } from './business-report-loan-workinghourcount/business-report-loan-workinghourcount.component';
import { BusinessReportNewyeargiftandbonusComponent } from './business-report-newyeargiftandbonus/business-report-newyeargiftandbonus.component';
import { BusinessReportInsuranceComponent } from './business-report-insurance/business-report-insurance.component';
import { BusinessReportSeverancepayComponent } from './business-report-severancepay/business-report-severancepay.component';
import { BusinessReportMonthlywageComponent } from './business-report-monthlywage/business-report-monthlywage.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { HighchartsChartModule } from 'highcharts-angular';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { BusinessReportListModalComponent } from './business-report-list-modal/business-report-list-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessReportPageRoutingModule } from './business-report-routing.module';
import { WorkingovertimeComponent } from './workingovertime/workingovertime.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BusinessReportPageRoutingModule,
		ShareModulePageModule,
		HighchartsChartModule,
		NgPersianDatepickerModule,
		ReactiveFormsModule,
		NgSelectModule,
	],
	declarations: [
		BusinessReportListModalComponent,
		BusinessReportMonthlywageComponent,
		BusinessReportSeverancepayComponent,
		BusinessReportInsuranceComponent,
		WorkingovertimeComponent,
		BusinessReportNewyeargiftandbonusComponent,
		BusinessReportLoanWorkinghourcountComponent
	],
})
export class BusinessReportPageModule {}
