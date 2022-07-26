import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollBaseInfoPayrollAdditionListPageRoutingModule } from './payroll-base-info-payroll-addition-list-routing.module';

// import { PayrollBaseInfoPayrollAdditionListPage } from './payroll-base-info-payroll-addition-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollBaseInfoPayrollAdditionListPageRoutingModule
  ],
  // declarations: [PayrollBaseInfoPayrollAdditionListPage]
})
export class PayrollBaseInfoPayrollAdditionListPageModule {}
