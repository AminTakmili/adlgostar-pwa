import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollListPageRoutingModule } from './payroll-list-routing.module';

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
