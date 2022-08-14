import { SentenceEditComponent } from './sentence-edit/sentence-edit.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { SentenceAddComponent } from './sentence-add/sentence-add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../../core/pipes/pipe.module';
import { SentenceListComponent } from './sentence-list/sentence-list.component';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { SentenceDetailComponent } from './sentence-detail/sentence-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentencePageRoutingModule } from './sentence-routing.module';

// import { SentencePage } from './sentence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SentencePageRoutingModule,
    ShareModulePageModule,
    PipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgPersianDatepickerModule
  ],
  declarations: [SentenceListComponent,SentenceDetailComponent,SentenceAddComponent,SentenceEditComponent]
})
export class SentencePageModule {}
