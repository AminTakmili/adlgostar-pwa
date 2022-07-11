import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './../../core/pipes/pipe.module';
import { SentenceListComponent } from './sentence-list/sentence-list.component';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { SentenceDetailComponent } from './sentence-detail/sentence-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  ],
  declarations: [SentenceListComponent,SentenceDetailComponent]
})
export class SentencePageModule {}
