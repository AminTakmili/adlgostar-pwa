import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreMinimumDailyWageListComponent } from './more-minimum-daily-wage-list/more-minimum-daily-wage-list.component';


const routes: Routes = [
  {
    path: '',
    component: MoreMinimumDailyWageListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreMinimumDailyWagePageRoutingModule {}
