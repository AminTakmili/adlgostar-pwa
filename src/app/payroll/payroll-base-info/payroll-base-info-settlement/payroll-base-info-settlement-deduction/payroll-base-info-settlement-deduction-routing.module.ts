import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PayrollSettlementDeductionAddComponent } from './payroll-settlement-deduction-add/payroll-settlement-deduction-add.component';
import { PayrollSettlementDeductionEditComponent } from './payroll-settlement-deduction-edit/payroll-settlement-deduction-edit.component';
import { PayrollSettlementDeductionListComponent } from './payroll-settlement-deduction-list/payroll-settlement-deduction-list.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'list',
	},
	{
		path: 'edit',
		redirectTo: 'list',
	},
	{
		path: 'list',
		component: PayrollSettlementDeductionListComponent,
	},
	{
		path: 'add',
		component: PayrollSettlementDeductionAddComponent,
	},
	{
		path: 'edit/:id',
		component: PayrollSettlementDeductionEditComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PayrollBaseInfoSettlementDeductionPageRoutingModule {}
