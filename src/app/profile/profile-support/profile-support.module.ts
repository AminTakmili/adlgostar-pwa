import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileSupportAddComponent } from './profile-support-add/profile-support-add.component';
import { ProfileSupportDetailComponent } from './profile-support-detail/profile-support-detail.component';
import { ProfileSupportListComponent } from './profile-support-list/profile-support-list.component';
import { ProfileSupportPageRoutingModule } from './profile-support-routing.module';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

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
		NgSelectModule,
		NgxPaginationModule,
	],
	declarations: [
		ProfileSupportAddComponent,
		ProfileSupportListComponent,
		ProfileSupportDetailComponent
	]
})
export class ProfileSupportPageModule { }
