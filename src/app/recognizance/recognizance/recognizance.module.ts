import { RecognizancePrintComponent } from './recognizance-print/recognizance-print.component';
import { RecognizanceDetailComponent } from './recognizance-detail/recognizance-detail.component';
import { RecognizanceEditComponent } from './recognizance-edit/recognizance-edit.component';
import { RecognizanceAddComponent } from './recognizance-add/recognizance-add.component';
import { PipeModule } from './../../core/pipes/pipe.module';
import { ClipboardModule } from 'ngx-clipboard';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { RecognizanceListComponent } from './recognizance-list/recognizance-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecognizancePageRoutingModule } from './recognizance-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RecognizancePageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
		CKEditorModule,
		NgPersianDatepickerModule,
		ClipboardModule,
		PipeModule,
	],
	declarations: [
		RecognizanceListComponent,
		RecognizanceAddComponent,
		RecognizanceEditComponent,
		RecognizanceDetailComponent,
		RecognizancePrintComponent
	],
})
export class RecognizancePageModule {}
