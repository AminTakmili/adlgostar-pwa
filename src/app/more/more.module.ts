import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorePageRoutingModule } from './more-routing.module';
import { MoreBasicYearsComponent } from './more-basic-years/more-basic-years.component';
import { MoreCalcBasicYearsComponent } from './more-calc-basic-years/more-calc-basic-years.component';
import { MoreExtraSalaryItemComponent } from './more-extra-salary-item/more-extra-salary-item.component';
import { MoreMinimumDailyWageComponent } from './more-minimum-daily-wage/more-minimum-daily-wage.component';
import { MoreSalaryConstantsComponent } from './more-salary-constants/more-salary-constants.component';
import { ShareModulePageModule } from '../share-module/share-module.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorePageRoutingModule,
	ShareModulePageModule
  ],
  declarations: [
	MoreBasicYearsComponent,
	MoreCalcBasicYearsComponent,
	MoreExtraSalaryItemComponent,
	MoreMinimumDailyWageComponent,
	MoreSalaryConstantsComponent,
  ]
})
export class MorePageModule {}
