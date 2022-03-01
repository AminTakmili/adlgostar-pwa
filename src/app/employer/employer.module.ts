import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployerPageRoutingModule } from './employer-routing.module';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { EmployerAddComponent } from './employer-add/employer-add.component';
import { EmployerEditComponent } from './employer-edit/employer-edit.component';
import { EmployerDetailComponent } from './employer-detail/employer-detail.component';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerPageRoutingModule,
	ShareModulePageModule,
    ReactiveFormsModule,
	NgSelectModule,
	NgxPaginationModule,
	NgPersianDatepickerModule,
  ],
  declarations: [
	EmployerListComponent,
	EmployerAddComponent,
	EmployerEditComponent,
	EmployerDetailComponent
  ]
})
export class EmployerPageModule {}
