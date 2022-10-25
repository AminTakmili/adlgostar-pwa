import { FormTemplateEditComponent } from './form-template-edit/form-template-edit.component';
import { FormTemplateListComponent } from './form-template-list/form-template-list.component';
import { FormTemplateAddComponent } from './form-template-add/form-template-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo:'list'
  },
  {
    path:'add',
    component:FormTemplateAddComponent
  },
  {
    path:'list',
    component:FormTemplateListComponent
  },
  {
    path:'edit',
    redirectTo:'list'
  },
  {
    path:'edit/:id',
    component:FormTemplateEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTemplatePageRoutingModule {}
