import { BusinessReportLoanUnpaidloanComponent } from './components/business-report-loan-unpaidloan/business-report-loan-unpaidloan.component';
import { BusinessReportLoanPaidloanComponent } from './components/business-report-loan-paidloan/business-report-loan-paidloan.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { HighchartsChartModule } from 'highcharts-angular';
import { ShareModulePageModule } from './../../../share-module/share-module.module';
import { BusinessReportLoanLoanComponent } from './components/business-report-loan-loan/business-report-loan-loan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessReportLoanPageRoutingModule } from './business-report-loan-routing.module';

import { BusinessReportLoanPage } from './business-report-loan.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BusinessReportLoanPageRoutingModule,
		ShareModulePageModule,
		HighchartsChartModule,
		NgPersianDatepickerModule,
		ReactiveFormsModule,
		NgSelectModule,
	],
	declarations: [
		BusinessReportLoanPage,
		BusinessReportLoanLoanComponent,
		BusinessReportLoanPaidloanComponent,
		BusinessReportLoanUnpaidloanComponent,
	],
})
export class BusinessReportLoanPageModule {}
