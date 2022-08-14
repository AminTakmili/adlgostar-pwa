import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../core/pipes/pipe.module';
import { SettlementPage } from './settlement.page';
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
  declarations: [SettlementPage]
})
export class SettlementPageModule {}
