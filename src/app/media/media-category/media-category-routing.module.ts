import { MediaCategoryFilesListComponent } from './media-category-files-list/media-category-files-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaCategoryPage } from './media-category.page';

const routes: Routes = [
  {
    path: '',
    component: MediaCategoryPage
  },
  {
    path: ':id',
    component: MediaCategoryFilesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaCategoryPageRoutingModule {}
