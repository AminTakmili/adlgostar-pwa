import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PayrollSettlementTemplateAddComponent } from './payroll-settlement-template-add/payroll-settlement-template-add.component';
import { PayrollSettlementTemplateEditComponent } from './payroll-settlement-template-edit/payroll-settlement-template-edit.component';
import { PayrollSettlementTemplateListComponent } from './payroll-settlement-template-list/payroll-settlement-template-list.component';

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
		component: PayrollSettlementTemplateListComponent,
	},
	{
		path: 'add',
		component: PayrollSettlementTemplateAddComponent,
	},
	{
		path: 'edit/:id',
		component: PayrollSettlementTemplateEditComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PayrollSettlementTemplatePageRoutingModule {}
