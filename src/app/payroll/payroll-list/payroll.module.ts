import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PayrollListPageRoutingModule } from './payroll-routing.module';

// import { PayrollListPage } from './payroll-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollListPageRoutingModule
  ],
  // declarations: [PayrollListPage]
})
export class PayrollListPageModule {}
