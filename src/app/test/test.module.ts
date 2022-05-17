import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TestPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgSelectModule,
	],
	declarations: [TestPage]
})
export class TestPageModule { }
