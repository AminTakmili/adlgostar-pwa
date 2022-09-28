import { SettlementListComponent } from './settlement-list/settlement-list.component';
import { SettlementEditComponent } from './settlement-edit/settlement-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../core/pipes/pipe.module';
import { SettlementAddComponent } from './settlement-add/settlement-add.component';
import { SettlementPageRoutingModule } from './settlement-routing.module';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettlementPageRoutingModule,
  
    ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
		// CKEditorModule,
		NgPersianDatepickerModule,
		// ClipboardModule,
		PipeModule
    
  ],
  declarations: [SettlementAddComponent,SettlementEditComponent,SettlementListComponent]
})
export class SettlementPageModule {}
