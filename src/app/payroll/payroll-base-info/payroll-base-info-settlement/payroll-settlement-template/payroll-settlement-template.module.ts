import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ng2-ckeditor';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PayrollSettlementTemplateAddComponent } from './payroll-settlement-template-add/payroll-settlement-template-add.component';
import { PayrollSettlementTemplateEditComponent } from './payroll-settlement-template-edit/payroll-settlement-template-edit.component';
import { PayrollSettlementTemplateListComponent } from './payroll-settlement-template-list/payroll-settlement-template-list.component';
import { PayrollSettlementTemplatePageRoutingModule } from './payroll-settlement-template-routing.module';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PayrollSettlementTemplatePageRoutingModule,
		ShareModulePageModule,
		NgxPaginationModule,
		NgSelectModule,
		ReactiveFormsModule,
		CKEditorModule,
	],
	declarations: [
		PayrollSettlementTemplateListComponent,
		PayrollSettlementTemplateAddComponent,
		PayrollSettlementTemplateEditComponent,
	],
})
export class PayrollSettlementTemplatePageModule {}
