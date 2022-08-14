import { PayrollTaxEditComponent } from './payroll-tax-edit/payroll-tax-edit.component';
import { PayrollTaxAddComponent } from './payroll-tax-add/payroll-tax-add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { PayrollTaxListComponent } from './payroll-tax-list/payroll-tax-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollBaseInfoPayrollTaxPageRoutingModule } from './payroll-base-info-payroll-tax-routing.module';

// import { PayrollBaseInfoPayrollTaxPage } from './payroll-base-info-payroll-tax.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollBaseInfoPayrollTaxPageRoutingModule,
    ShareModulePageModule,
    NgxPaginationModule,
		NgSelectModule,
    ReactiveFormsModule
  ],
  declarations: [PayrollTaxListComponent,PayrollTaxAddComponent,PayrollTaxEditComponent]
})
export class PayrollBaseInfoPayrollTaxPageModule {}
