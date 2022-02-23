import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { IonicModule } from '@ionic/angular';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

import { MoreSalaryConstantsPageRoutingModule } from './more-salary-constants-routing.module';

import { MoreSalaryConstantsAddComponent } from './more-salary-constants-add/more-salary-constants-add.component';
import { MoreSalaryConstantsEditComponent } from './more-salary-constants-edit/more-salary-constants-edit.component';
import { MoreSalaryConstantsListComponent } from './more-salary-constants-list/more-salary-constants-list.component';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MoreSalaryConstantsPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
	],
	declarations: [
		MoreSalaryConstantsAddComponent,
		MoreSalaryConstantsEditComponent,
		MoreSalaryConstantsListComponent,
	]
})
export class MoreSalaryConstantsPageModule { }
