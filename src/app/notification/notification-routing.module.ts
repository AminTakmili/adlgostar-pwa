import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent
  },
  {
    path: ':id',
    component: NotificationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
