import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PayrollAdditionAddComponent } from './payroll-addition-add/payroll-addition-add.component';
import { PayrollAdditionEditComponent } from './payroll-addition-edit/payroll-addition-edit.component';
import { PayrollAdditionListComponent } from './payroll-addition-list/payroll-addition-list.component';
import { PayrollBaseInfoPayrollAdditionListPageRoutingModule } from './payroll-base-info-payroll-addition-list-routing.module';
import { ShareModulePageModule } from './../../../share-module/share-module.module';

// import { PayrollBaseInfoPayrollAdditionListPage } from './payroll-base-info-payroll-addition-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollBaseInfoPayrollAdditionListPageRoutingModule,
    ShareModulePageModule,
    NgxPaginationModule,
		NgSelectModule,
    ReactiveFormsModule
  ],
  declarations: [PayrollAdditionListComponent,PayrollAdditionAddComponent,PayrollAdditionEditComponent]
})
export class PayrollBaseInfoPayrollAdditionListPageModule {}
