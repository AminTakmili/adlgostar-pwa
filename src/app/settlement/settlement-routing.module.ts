import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SettlementPage } from './settlement.page';

const routes: Routes = [

  {
    path: 'add/:businessEmId',
    component: SettlementPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlementPageRoutingModule {}
