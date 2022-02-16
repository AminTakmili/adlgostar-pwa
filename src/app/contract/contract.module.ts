import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractPageRoutingModule } from './contract-routing.module';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractAddComponent } from './contract-add/contract-add.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ShareModulePageModule } from '../share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorComponent } from 'ckeditor4-angular';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractPageRoutingModule,
	ShareModulePageModule,
	ReactiveFormsModule,
	NgxPaginationModule,
	NgSelectModule,
	CKEditorModule,
	DpDatePickerModule

  ],

  declarations: [
	ContractListComponent,
	ContractAddComponent,
	ContractDetailComponent,
	ContractEditComponent,
  ]
})
export class ContractPageModule {}
