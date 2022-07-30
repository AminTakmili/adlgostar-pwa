import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PayrollBaseInfoSettlementAdditionPageRoutingModule } from './payroll-base-info-settlement-addition-routing.module';
import { PayrollSettlementAdditionAddComponent } from './payroll-settlement-addition-add/payroll-settlement-addition-add.component';
import { PayrollSettlementAdditionEditComponent } from './payroll-settlement-addition-edit/payroll-settlement-addition-edit.component';
import { PayrollSettlementAdditionListComponent } from './payroll-settlement-addition-list/payroll-settlement-addition-list.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PayrollBaseInfoSettlementAdditionPageRoutingModule,
		ShareModulePageModule,
		NgxPaginationModule,
		NgSelectModule,
		ReactiveFormsModule,
	],
	declarations: [
		PayrollSettlementAdditionListComponent,
		PayrollSettlementAdditionAddComponent,
    PayrollSettlementAdditionEditComponent
  ],
})
export class PayrollBaseInfoSettlementAdditionPageModule {}
