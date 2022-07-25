import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';
import { ShareModulePageModule } from '../share-module/share-module.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    ShareModulePageModule,
    NgSelectModule,
    NgxPaginationModule,
    
  ],
  declarations: [NotificationListComponent,NotificationDetailComponent]
})
export class NotificationPageModule {}
