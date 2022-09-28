import { MediaCategoryFilesListComponent } from './media-category-files-list/media-category-files-list.component';
import { ShareModulePageModule } from './../../share-module/share-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaCategoryPageRoutingModule } from './media-category-routing.module';

import { MediaCategoryPage } from './media-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaCategoryPageRoutingModule,
    ShareModulePageModule
  ],
  declarations: [MediaCategoryPage,MediaCategoryFilesListComponent]
})
export class MediaCategoryPageModule {}
