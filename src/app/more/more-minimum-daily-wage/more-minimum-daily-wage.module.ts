import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreMinimumDailyWagePageRoutingModule } from './more-minimum-daily-wage-routing.module';
import { MoreMinimumDailyWageListComponent } from './more-minimum-daily-wage-list/more-minimum-daily-wage-list.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MoreMinimumDailyWagePageRoutingModule,
		ShareModulePageModule,
		NgxPaginationModule,
		NgSelectModule
	],
	declarations: [
		MoreMinimumDailyWageListComponent
	]
})
export class MoreMinimumDailyWagePageModule { }
