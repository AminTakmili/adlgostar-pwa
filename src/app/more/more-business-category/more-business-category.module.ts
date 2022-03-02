import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreBusinessCategoryPageRoutingModule } from './more-business-category-routing.module';
import { MoreBusinessCategoryListComponent } from './more-business-category-list/more-business-category-list.component';
import { MoreBusinessCategoryAddComponent } from './more-business-category-add/more-business-category-add.component';
import { MoreBusinessCategoryEditComponent } from './more-business-category-edit/more-business-category-edit.component';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MoreBusinessSubcategoryListComponent } from './more-business-subcategory-list/more-business-subcategory-list.component';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MoreBusinessCategoryPageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
	],
	declarations: [
		MoreBusinessCategoryListComponent,
		MoreBusinessCategoryAddComponent,
		MoreBusinessCategoryEditComponent,
		MoreBusinessSubcategoryListComponent
	],
	entryComponents: [
		MoreBusinessSubcategoryListComponent
	]
})
export class MoreBusinessCategoryPageModule { }
