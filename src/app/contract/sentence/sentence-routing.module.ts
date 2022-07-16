import { SentenceEditComponent } from './sentence-edit/sentence-edit.component';
import { SentenceAddComponent } from './sentence-add/sentence-add.component';
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
  },
  {
    path: ':id/edit',
    component: SentenceEditComponent
  },
  {
    path: ':contractId/add',
    component: SentenceAddComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentencePageRoutingModule {}
