import { SentenceListComponent } from './sentence-list/sentence-list.component';
import { SentenceDetailComponent } from './sentence-detail/sentence-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SentencePage } from './sentence.page';

const routes: Routes = [
  {
    path: ':id',
    component: SentenceListComponent
  },
  {
    path: ':id/detail',
    component: SentenceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentencePageRoutingModule {}
