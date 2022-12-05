import { FormTemplateEditComponent } from './form-template-edit/form-template-edit.component';
import { FormTemplateListComponent } from './form-template-list/form-template-list.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../core/pipes/pipe.module';
import { ClipboardModule } from 'ngx-clipboard';
import { ShareModulePageModule } from './../share-module/share-module.module';
import { FormTemplateAddComponent } from './form-template-add/form-template-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTemplatePageRoutingModule } from './form-template-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		FormTemplatePageRoutingModule,
		ShareModulePageModule,
		ReactiveFormsModule,
		ClipboardModule,
		PipeModule,
		NgxPaginationModule,
		CKEditorModule,
	],
	declarations: [
		FormTemplateListComponent,
		FormTemplateAddComponent,
		FormTemplateEditComponent,
	],
})
export class FormTemplatePageModule {}
