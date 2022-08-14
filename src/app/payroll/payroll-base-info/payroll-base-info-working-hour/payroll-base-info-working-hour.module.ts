import { PayrollBaseInfoWorkingHourEditComponent } from './payroll-base-info-working-hour-edit/payroll-base-info-working-hour-edit.component';
import { PayrollBaseInfoWorkingHourAddComponent } from './payroll-base-info-working-hour-add/payroll-base-info-working-hour-add.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../../../core/pipes/pipe.module';
import { PayrollBaseInfoWorkingHourListComponent } from './payroll-base-info-working-hour-list/payroll-base-info-working-hour-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkingHourPageRoutingModule } from './payroll-base-info-working-hour-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		WorkingHourPageRoutingModule,
		PipeModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
		ShareModulePageModule,
	],
	declarations: [
		PayrollBaseInfoWorkingHourListComponent,
		PayrollBaseInfoWorkingHourAddComponent,
		PayrollBaseInfoWorkingHourEditComponent,
		
	],
})
export class WorkingHourPageModule {}
