import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ReportPayrollMonthlywageComponent } from './report-payroll-monthlywage/report-payroll-monthlywage.component';
import { ReportPayrollPageRoutingModule } from './report-payroll-routing.module';
import { ReportPayrollRemainingleaveComponent } from './report-payroll-remainingleave/report-payroll-remainingleave.component';
import { ReportPayrollSeverancepayListComponent } from './report-payroll-severancepay-list/report-payroll-severancepay-list.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReportPayrollPageRoutingModule,
	],
	declarations: [
		ReportPayrollMonthlywageComponent,
		ReportPayrollRemainingleaveComponent,
    ReportPayrollSeverancepayListComponent
	],
})
export class ReportPayrollPageModule {}
