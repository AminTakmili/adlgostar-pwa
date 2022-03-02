import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreEmployeePostsPageRoutingModule } from './more-employee-posts-routing.module';
import { MoreEmployeePostsListComponent } from './more-employee-posts-list/more-employee-posts-list.component';
import { MoreEmployeePostsAddComponent } from './more-employee-posts-add/more-employee-posts-add.component';
import { MoreEmployeePostsEditComponent } from './more-employee-posts-edit/more-employee-posts-edit.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MoreEmployeePostsPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
	],
	declarations: [
		MoreEmployeePostsListComponent,
		MoreEmployeePostsAddComponent,
		MoreEmployeePostsEditComponent,

	]
})
export class MoreEmployeePostsPageModule { }
