import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
//   {
//     path: '',
//     component: MoreExtraSalaryItemPage
//   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreExtraSalaryItemPageRoutingModule {}
