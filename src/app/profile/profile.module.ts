import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfileChangeNumberComponent } from './profile-change-number/profile-change-number.component';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ProfilePageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
	],
	declarations: [
		ProfileChangeNumberComponent
	]
})
export class ProfilePageModule { }
