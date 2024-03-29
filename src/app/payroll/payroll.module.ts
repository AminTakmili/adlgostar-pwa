import { PreviewPayrollComponent } from './preview-payroll/preview-payroll.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollPageRoutingModule } from './payroll-routing.module';

// import { PayrollPage } from './payroll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollPageRoutingModule
  ],
  // exports:[PreviewPayrollComponent],
  // declarations: [PreviewPayrollComponent]
})
export class PayrollPageModule {}
