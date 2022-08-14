import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ng2-ckeditor';
import { ClipboardModule } from 'ngx-clipboard';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../../core/pipes/pipe.module';
import { ReportPayrollMonthlywageComponent } from './report-payroll-monthlywage/report-payroll-monthlywage.component';
import { ReportPayrollPageRoutingModule } from './report-payroll-routing.module';
import { ReportPayrollRemainingleaveComponent } from './report-payroll-remainingleave/report-payroll-remainingleave.component';
import { ReportPayrollSeverancepayListComponent } from './report-payroll-severancepay-list/report-payroll-severancepay-list.component';
import { ShareModulePageModule } from './../../share-module/share-module.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReportPayrollPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
		CKEditorModule,
		NgPersianDatepickerModule,
		ClipboardModule,
		PipeModule
	],
	declarations: [
		ReportPayrollMonthlywageComponent,
		ReportPayrollRemainingleaveComponent,
    ReportPayrollSeverancepayListComponent
	],
})
export class ReportPayrollPageModule {}
