import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersAllPageRoutingModule } from './users-all-routing.module';
import { UsersAllListComponent } from './users-all-list/users-all-list.component';
import { UsersAllAddComponent } from './users-all-add/users-all-add.component';
import { UsersAllEditComponent } from './users-all-edit/users-all-edit.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		UsersAllPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgSelectModule,
		NgxPaginationModule,
		NgPersianDatepickerModule,
	],
	declarations: [
		UsersAllListComponent,
		UsersAllAddComponent,
		UsersAllEditComponent,
	]
})
export class UsersAllPageModule { }
