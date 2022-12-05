import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { MediaPage } from './media.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: MediaPage
  // },

  {
    path: 'category',
    loadChildren: () => import('./media-category/media-category.module').then( m => m.MediaCategoryPageModule)
  },
  {
    path: 'uploaded_file_category/list',
redirectTo:'category'  
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaPageRoutingModule {}
