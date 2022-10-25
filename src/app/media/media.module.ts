import { MediaEditModalComponent } from './media-edit-modal/media-edit-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaPageRoutingModule } from './media-routing.module';
import { MediaAddModalComponent } from './media-add-modal/media-add-modal.component';
import { ShareModulePageModule } from '../share-module/share-module.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaPageRoutingModule,
    ShareModulePageModule,
    ReactiveFormsModule
  ],
  declarations: [MediaAddModalComponent,MediaEditModalComponent]
})
export class MediaPageModule {}
