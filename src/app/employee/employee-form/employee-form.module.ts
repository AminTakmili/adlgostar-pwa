import { EmployeeFormTableComponent } from './employee-form-table/employee-form-table.component';
import { EmployeeFormEditComponent } from './employee-form-edit/employee-form-edit.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { EmployeeFormAddComponent } from './employee-form-add/employee-form-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeFormPageRoutingModule } from './employee-form-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		EmployeeFormPageRoutingModule,
		ShareModulePageModule,
		NgSelectModule,
		ReactiveFormsModule,
		NgPersianDatepickerModule,
		NgxPaginationModule,
		CKEditorModule,
	],
	declarations: [
		EmployeeFormAddComponent,
		EmployeeFormEditComponent,
		EmployeeFormTableComponent,
	],
	exports:[
		EmployeeFormTableComponent,

	]
})
export class EmployeeFormPageModule {}
