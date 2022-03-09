import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersTypePageRoutingModule } from './users-type-routing.module';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersTypeListComponent } from './users-type-list/users-type-list.component';
import { UsersTypeAddComponent } from './users-type-add/users-type-add.component';
import { UsersTypeEditComponent } from './users-type-edit/users-type-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersTypePageRoutingModule,
	ShareModulePageModule,
	ReactiveFormsModule,
	NgxPaginationModule,
	NgSelectModule,
  ],
  declarations: [
	UsersTypeListComponent ,
	UsersTypeAddComponent,
	UsersTypeEditComponent
  ]
})
export class UsersTypePageModule {}
