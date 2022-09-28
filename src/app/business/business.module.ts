import { RequestAddContractComponent } from './request-add-contract/request-add-contract.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';

import { BusinessPageRoutingModule } from './business-routing.module';
import { BusinessListComponent } from './business-list/business-list.component';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BusinessAddComponent } from './business-add/business-add.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BussinesEmployeeAddComponent } from './bussines-employee-add/bussines-employee-add.component';
import { BusinessImporterComponent } from './business-importer/business-importer.component';
import { BusinessEmployeeEditComponent } from './business-employee-edit/business-employee-edit.component';
import { BusinessEmployeeImporterComponent } from './business-employee-importer/business-employee-importer.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { RequestAddPayrollComponent } from './request-add-payroll/request-add-payroll.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BusinessPageRoutingModule,
		ShareModulePageModule,
		NgSelectModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgPersianDatepickerModule
	],
	declarations: [
		BusinessListComponent,
		BusinessAddComponent,
		BusinessEditComponent,
		BusinessDetailComponent,
		BussinesEmployeeAddComponent,
		BusinessImporterComponent,
		BusinessEmployeeEditComponent,
		BusinessEmployeeImporterComponent,
		RequestAddContractComponent,
		RequestAddPayrollComponent

	]
})
export class BusinessPageModule { }
