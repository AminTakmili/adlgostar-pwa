import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SettlementAddComponent } from './settlement-add/settlement-add.component';

const routes: Routes = [

  {
    path: 'add/:businessEmId',
    component: SettlementAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlementPageRoutingModule {}
