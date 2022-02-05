import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';

import { BusinessPageRoutingModule } from './business-routing.module';
import { BusinessListComponent } from './business-list/business-list.component';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BusinessAddComponent } from './business-add/business-add.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BusinessPageRoutingModule,
		ShareModulePageModule,
		NgSelectModule,
		ReactiveFormsModule
	],
	declarations: [
		BusinessListComponent,
		BusinessAddComponent,
		BusinessEditComponent
	]
})
export class BusinessPageModule { }
