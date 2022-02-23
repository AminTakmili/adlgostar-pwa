import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreCalcBasicYearsPageRoutingModule } from './more-calc-basic-years-routing.module';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MoreCalcBasicYearsListComponent } from './more-calc-basic-years-list/more-calc-basic-years-list.component';
import { MoreCalcBasicYearsAddComponent } from './more-calc-basic-years-add/more-calc-basic-years-add.component';
import { MoreCalcBasicYearsEditComponent } from './more-calc-basic-years-edit/more-calc-basic-years-edit.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreCalcBasicYearsPageRoutingModule,
	ShareModulePageModule,
	ReactiveFormsModule,
	NgxPaginationModule,
	NgSelectModule,
  ],
  declarations: [
	MoreCalcBasicYearsListComponent,
	MoreCalcBasicYearsAddComponent,
	MoreCalcBasicYearsEditComponent
  ]
})
export class MoreCalcBasicYearsPageModule {}
