import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PayrollBaseInfoPageRoutingModule } from './payroll-base-info-routing.module';

// import { PayrollBaseInfoPage } from './payroll-base-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollBaseInfoPageRoutingModule
  ],
  // declarations: [PayrollBaseInfoPage]
})
export class PayrollBaseInfoPageModule {}
