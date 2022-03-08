import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersRolePageRoutingModule } from './users-role-routing.module';
import { UsersRoleListComponent } from './users-role-list/users-role-list.component';
import { UsersRoleAddComponent } from './users-role-add/users-role-add.component';
import { UsersRoleEditComponent } from './users-role-edit/users-role-edit.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		UsersRolePageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
	],
	declarations: [
		UsersRoleListComponent,
		UsersRoleAddComponent,
		UsersRoleEditComponent,
	]
})
export class UsersRolePageModule { }
