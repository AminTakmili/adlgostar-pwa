import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreBankPageRoutingModule } from './more-bank-routing.module';
import { MoreBankListComponent } from './more-bank-list/more-bank-list.component';
import { MoreBankAddComponent } from './more-bank-add/more-bank-add.component';
import { MoreBankEditComponent } from './more-bank-edit/more-bank-edit.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MoreBankPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
	],
	declarations: [
		MoreBankListComponent,
		MoreBankAddComponent,
		MoreBankEditComponent,
	]
})
export class MoreBankPageModule { }
