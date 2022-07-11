import { FooterTemplateEditComponent } from './footer-template-edit/footer-template-edit.component';
import { FooterTemplateAddComponent } from './footer-template-add/footer-template-add.component';
import { FooterTemplateListComponent } from './footer-template-list/footer-template-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'list',
    component: FooterTemplateListComponent
  },
  {
    path: 'add',
    component: FooterTemplateAddComponent
  },
  {
    path: 'edit/:id',
    component: FooterTemplateEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterTemplatePageRoutingModule {}
