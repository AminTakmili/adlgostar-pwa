import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreBasicYearsPageRoutingModule } from './more-basic-years-routing.module';
import { MoreBasicYearsListComponent } from './more-basic-years-list/more-basic-years-list.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreBasicYearsPageRoutingModule,
	ShareModulePageModule,
	ReactiveFormsModule,
	NgxPaginationModule,
	NgSelectModule,
  ],
  declarations: [
	  MoreBasicYearsListComponent
  ]
})
export class MoreBasicYearsPageModule {}
