import { HeaderTemplateEditComponent } from './header-template-edit/header-template-edit.component';
import { HeaderTemplateAddComponent } from './header-template-add/header-template-add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../../core/pipes/pipe.module';
import { HeaderTemplateListComponent } from './header-template-list/header-template-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderTemplatePageRoutingModule } from './header-template-routing.module';

// import { HeaderTemplatePage } from './header-template.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderTemplatePageRoutingModule,
    ShareModulePageModule,
    NgxPaginationModule,
    PipeModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [HeaderTemplateListComponent,HeaderTemplateAddComponent,HeaderTemplateEditComponent]
})
export class HeaderTemplatePageModule {}
