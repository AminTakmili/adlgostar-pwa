import { RecognizanceTemplateEditComponent } from './recognizance-template-edit/recognizance-template-edit.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgSelectModule } from '@ng-select/ng-select';
import { RecognizanceTemplateAddComponent } from './recognizance-template-add/recognizance-template-add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClipboardModule } from 'ngx-clipboard';
import { PipeModule } from './../../core/pipes/pipe.module';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { RecognizanceTemplateListComponent } from './recognizance-template-list/recognizance-template-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecognizanceTemplatePageRoutingModule } from './recognizance-template-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecognizanceTemplatePageRoutingModule,
    ShareModulePageModule,
		ReactiveFormsModule,
    ClipboardModule,
		PipeModule,
    NgxPaginationModule,
    // NgSelectModule,
    CKEditorModule

  ],
  declarations: [RecognizanceTemplateListComponent,RecognizanceTemplateAddComponent,RecognizanceTemplateEditComponent]
})
export class RecognizanceTemplatePageModule {}
