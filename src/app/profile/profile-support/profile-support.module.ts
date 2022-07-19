import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSupportPageRoutingModule } from './profile-support-routing.module';
import { ProfileSupportAddComponent } from './profile-support-add/profile-support-add.component';
import { ProfileSupportListComponent } from './profile-support-list/profile-support-list.component';
import { ProfileSupportDetailComponent } from './profile-support-detail/profile-support-detail.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ProfileSupportPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
	],
	declarations: [
		ProfileSupportAddComponent,
		ProfileSupportListComponent,
		ProfileSupportDetailComponent
	]
})
export class ProfileSupportPageModule { }
