import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployerPageRoutingModule } from './employer-routing.module';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { EmployerAddComponent } from './employer-add/employer-add.component';
import { EmployerEditComponent } from './employer-edit/employer-edit.component';
import { EmployerDetailComponent } from './employer-detail/employer-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerPageRoutingModule
  ],
  declarations: [
	EmployerListComponent,
	EmployerAddComponent,
	EmployerEditComponent,
	EmployerDetailComponent
  ]
})
export class EmployerPageModule {}
