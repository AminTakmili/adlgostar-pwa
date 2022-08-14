import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EmployeeLeaveAddComponent } from './employee-leave-add/employee-leave-add.component';
import { EmployeeLeaveEditComponent } from './employee-leave-edit/employee-leave-edit.component';
import { EmployeeLeavePageRoutingModule } from './employee-leave-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../../core/pipes/pipe.module';
import { ShareModulePageModule } from './../../share-module/share-module.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		EmployeeLeavePageRoutingModule,
		PipeModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
		ShareModulePageModule,
	],
	declarations: [EmployeeLeaveAddComponent, EmployeeLeaveEditComponent],
})
export class EmployeeLeavePageModule {}
