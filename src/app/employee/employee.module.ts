import { EmployeeFormPageModule } from './employee-form/employee-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeePageRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { EmployeePrevComponent } from './employee-prev/employee-prev.component';
import { EmployeeImporterComponent } from './employee-importer/employee-importer.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		EmployeePageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgSelectModule,
		NgxPaginationModule,
		NgPersianDatepickerModule,
		EmployeeFormPageModule
	],
	declarations: [
		EmployeeListComponent,
		EmployeeAddComponent,
		EmployeeEditComponent,
		EmployeeDetailComponent,
		EmployeePrevComponent,
		EmployeeImporterComponent
	],
	entryComponents: [
		EmployeePrevComponent
	],
	exports: [
		EmployeePrevComponent
	]
})
export class EmployeePageModule { }
