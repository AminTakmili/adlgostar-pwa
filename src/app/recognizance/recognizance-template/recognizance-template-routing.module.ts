import { RecognizanceTemplateEditComponent } from './recognizance-template-edit/recognizance-template-edit.component';
import { RecognizanceTemplateAddComponent } from './recognizance-template-add/recognizance-template-add.component';
import { RecognizanceTemplateListComponent } from './recognizance-template-list/recognizance-template-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo:'list'
  },
  {
    path: 'list',
    component: RecognizanceTemplateListComponent
  },
  {
    path: 'add',
    component: RecognizanceTemplateAddComponent
  },
  {
    path: 'edit',
    redirectTo:'list'
  },
  {
    path: 'edit/:id',
    component: RecognizanceTemplateEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecognizanceTemplatePageRoutingModule {}
