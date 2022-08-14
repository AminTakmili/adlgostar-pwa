import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PayrollBaseInfoPayrollDeductionPageRoutingModule } from './payroll-base-info-payroll-deduction-routing.module';
import { PayrollDeductionAddComponent } from './payroll-deduction-add/payroll-deduction-add.component';
import { PayrollDeductionEditComponent } from './payroll-deduction-edit/payroll-deduction-edit.component';
import { PayrollDeductionListComponent } from './payroll-deduction-list/payroll-deduction-list.component';
import { ShareModulePageModule } from './../../../share-module/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollBaseInfoPayrollDeductionPageRoutingModule,
    ShareModulePageModule,
    NgxPaginationModule,
		NgSelectModule,
    ReactiveFormsModule
  ],
  declarations: [PayrollDeductionListComponent,PayrollDeductionAddComponent,PayrollDeductionEditComponent]
})
export class PayrollBaseInfoPayrollDeductionPageModule {}
