import { HeaderTemplateEditComponent } from './header-template-edit/header-template-edit.component';
import { HeaderTemplateAddComponent } from './header-template-add/header-template-add.component';
import { HeaderTemplateListComponent } from './header-template-list/header-template-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HeaderTemplatePage } from './header-template.page';

const routes: Routes = [
  {
    path: 'list',
    component: HeaderTemplateListComponent
  },
  {
    path: 'add',
    component: HeaderTemplateAddComponent
  },
  {
    path: 'edit/:id',
    component: HeaderTemplateEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderTemplatePageRoutingModule {}
