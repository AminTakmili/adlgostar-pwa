import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractAddComponent } from './contract-add/contract-add.component';
import { ContractConditionsAddComponent } from './contract-conditions-add/contract-conditions-add.component';
import { ContractConditionsEditComponent } from './contract-conditions-edit/contract-conditions-edit.component';
import { ContractConditionsListComponent } from './contract-conditions-list/contract-conditions-list.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractPrintComponent } from './contract-print/contract-print.component';
import { ContractTemplateAddComponent } from './contract-template-add/contract-template-add.component';
import { ContractTemplateEditComponent } from './contract-template-edit/contract-template-edit.component';
import { ContractTemplateListComponent } from './contract-template-list/contract-template-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: ContractListComponent
  },
  {
    path: 'add',
    component: ContractAddComponent
  },
  {
    path: 'detail/:id',
    component: ContractDetailComponent
  },
  {
    path: 'print/:contract_id/:employee_id',
    component: ContractPrintComponent
  },
  {
    path: 'edit/:id',
    component: ContractEditComponent
  },
  {
    path: 'template',
    component: ContractTemplateListComponent
  },
  {
    path: 'template/add',
    component: ContractTemplateAddComponent
  },
  {
    path: 'template/edit/:id',
    component: ContractTemplateEditComponent
  },
  {
    path: 'conditions',
    component: ContractConditionsListComponent
  },
  {
    path: 'conditions/add',
    component: ContractConditionsAddComponent
  },
  {
    path: 'conditions/edit/:id',
    component: ContractConditionsEditComponent
  },
  {
    path: 'sentence',
    loadChildren: () => import('./sentence/sentence.module').then( m => m.SentencePageModule)
  },
  {
    path: 'footer/template',
    loadChildren: () => import('./footer-template/footer-template.module').then( m => m.FooterTemplatePageModule)
  },
  {
    path: 'header/template',
    loadChildren: () => import('./header-template/header-template.module').then( m => m.HeaderTemplatePageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractPageRoutingModule {}
