import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractAddComponent } from './contract-add/contract-add.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ContractListComponent } from './contract-list/contract-list.component';


const routes: Routes = [
  {
    path: '',
    component: ContractListComponent
  },
  {
    path: 'add',
    component: ContractAddComponent
  },
  {
    path: 'detail/:contractId',
    component: ContractDetailComponent
  },
  {
    path: 'edit/:contractId',
    component: ContractEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractPageRoutingModule {}
