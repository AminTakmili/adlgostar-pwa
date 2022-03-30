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


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BusinessPageRoutingModule,
		ShareModulePageModule,
		NgSelectModule,
		ReactiveFormsModule,
		NgxPaginationModule
	],
	declarations: [
		BusinessListComponent,
		BusinessAddComponent,
		BusinessEditComponent,
		BusinessDetailComponent,
		BussinesEmployeeAddComponent,
		BusinessImporterComponent

	]
})
export class BusinessPageModule { }
