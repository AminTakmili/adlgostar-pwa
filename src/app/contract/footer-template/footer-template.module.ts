import { FooterTemplateEditComponent } from './footer-template-edit/footer-template-edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FooterTemplateAddComponent } from './footer-template-add/footer-template-add.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PipeModule } from './../../core/pipes/pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { FooterTemplateListComponent } from './footer-template-list/footer-template-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterTemplatePageRoutingModule } from './footer-template-routing.module';

// import { FooterTemplatePage } from './footer-template.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterTemplatePageRoutingModule,
    ShareModulePageModule,
    NgxPaginationModule,
    PipeModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [FooterTemplateListComponent,FooterTemplateAddComponent,FooterTemplateEditComponent]
})
export class FooterTemplatePageModule {}
