import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ClipboardModule } from 'ngx-clipboard';

import { ContractPageRoutingModule } from './contract-routing.module';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractAddComponent } from './contract-add/contract-add.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { ContractTemplateListComponent } from './contract-template-list/contract-template-list.component';
import { ContractTemplateAddComponent } from './contract-template-add/contract-template-add.component';
import { ContractTemplateEditComponent } from './contract-template-edit/contract-template-edit.component';
import { ContractConditionsListComponent } from './contract-conditions-list/contract-conditions-list.component';
import { ContractConditionsAddComponent } from './contract-conditions-add/contract-conditions-add.component';
import { ContractConditionsEditComponent } from './contract-conditions-edit/contract-conditions-edit.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { ContractPrintComponent } from './contract-print/contract-print.component';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ContractPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
		CKEditorModule,
		NgPersianDatepickerModule,
		ClipboardModule


	],

	declarations: [
		ContractListComponent,
		ContractAddComponent,
		ContractDetailComponent,
		ContractEditComponent,
		ContractTemplateListComponent,
		ContractTemplateAddComponent,
		ContractTemplateEditComponent,
		ContractConditionsListComponent,
		ContractConditionsAddComponent,
		ContractConditionsEditComponent,
		ContractPrintComponent
	]
})
export class ContractPageModule { }
