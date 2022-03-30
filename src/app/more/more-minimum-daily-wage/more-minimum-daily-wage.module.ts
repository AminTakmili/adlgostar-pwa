import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreMinimumDailyWagePageRoutingModule } from './more-minimum-daily-wage-routing.module';
import { MoreMinimumDailyWageListComponent } from './more-minimum-daily-wage-list/more-minimum-daily-wage-list.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MoreMinimumDailyWageAddComponent } from './more-minimum-daily-wage-add/more-minimum-daily-wage-add.component';
import { MoreMinimumDailyWageEditComponent } from './more-minimum-daily-wage-edit/more-minimum-daily-wage-edit.component';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MoreMinimumDailyWagePageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
	],
	declarations: [
		MoreMinimumDailyWageListComponent,
		MoreMinimumDailyWageAddComponent,
		MoreMinimumDailyWageEditComponent,
	]
})
export class MoreMinimumDailyWagePageModule { }
