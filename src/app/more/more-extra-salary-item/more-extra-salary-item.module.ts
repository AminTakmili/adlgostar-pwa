import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreExtraSalaryItemPageRoutingModule } from './more-extra-salary-item-routing.module';
import { MoreExtraSalaryItemAddComponent } from './more-extra-salary-item-add/more-extra-salary-item-add.component';
import { MoreExtraSalaryItemListComponent } from './more-extra-salary-item-list/more-extra-salary-item-list.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MoreExtraSalaryItemEditComponent } from './more-extra-salary-item-edit/more-extra-salary-item-edit.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MoreExtraSalaryItemPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
	],
	declarations: [
		MoreExtraSalaryItemAddComponent,
		MoreExtraSalaryItemListComponent,
		MoreExtraSalaryItemEditComponent
	]
})
export class MoreExtraSalaryItemPageModule { }
