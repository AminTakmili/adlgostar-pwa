import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EmployeeLoanAddComponent } from './employee-loan-add/employee-loan-add.component';
import { EmployeeLoanEditComponent } from './employee-loan-edit/employee-loan-edit.component';
import { EmployeeLoanPageRoutingModule } from './employee-loan-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModulePageModule } from './../../share-module/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeLoanPageRoutingModule,
    ShareModulePageModule,
		NgSelectModule,
		ReactiveFormsModule,
		NgPersianDatepickerModule,
    NgxPaginationModule
  ],
  declarations: [EmployeeLoanAddComponent,EmployeeLoanEditComponent]
})
export class EmployeeLoanPageModule {}
