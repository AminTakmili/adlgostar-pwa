import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreBasicYearsListComponent } from './more-basic-years-list/more-basic-years-list.component';



const routes: Routes = [
  {
    path: '',
    component: MoreBasicYearsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreBasicYearsPageRoutingModule {}
