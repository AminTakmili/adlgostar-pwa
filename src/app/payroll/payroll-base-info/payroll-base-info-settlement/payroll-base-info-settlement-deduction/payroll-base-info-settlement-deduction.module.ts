import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PayrollBaseInfoSettlementDeductionPageRoutingModule } from './payroll-base-info-settlement-deduction-routing.module';
import { PayrollSettlementDeductionAddComponent } from './payroll-settlement-deduction-add/payroll-settlement-deduction-add.component';
import { PayrollSettlementDeductionEditComponent } from './payroll-settlement-deduction-edit/payroll-settlement-deduction-edit.component';
import { PayrollSettlementDeductionListComponent } from './payroll-settlement-deduction-list/payroll-settlement-deduction-list.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PayrollBaseInfoSettlementDeductionPageRoutingModule,
		ShareModulePageModule,
		NgxPaginationModule,
		NgSelectModule,
		ReactiveFormsModule,
	],
	declarations: [
		PayrollSettlementDeductionListComponent,
		PayrollSettlementDeductionAddComponent,
		PayrollSettlementDeductionEditComponent,
	],
})
export class PayrollBaseInfoSettlementDeductionPageModule {}
