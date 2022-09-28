import { SettlementEditComponent } from './settlement-edit/settlement-edit.component';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SettlementAddComponent } from './settlement-add/settlement-add.component';
import { SettlementListComponent } from './settlement-list/settlement-list.component';

const routes: Routes = [

  {
    path: 'list',
    component: SettlementListComponent
  },
  {
    path: 'add',
    component: SettlementAddComponent
  },
  {
    path: 'add/:businessEmId',
    component: SettlementAddComponent
  },

  {
    path: 'edit/:settlementId',
    component: SettlementEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlementPageRoutingModule {}
