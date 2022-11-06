import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { BusinessReportLoanComponent } from './business-report-loan/business-report-loan.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { BusinessReportListModalComponent } from './business-report-list-modal/business-report-list-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessReportPageRoutingModule } from './business-report-routing.module';


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
    NgSelectModule
  ],
  declarations: [BusinessReportListModalComponent,BusinessReportLoanComponent]
})
export class BusinessReportPageModule {}
