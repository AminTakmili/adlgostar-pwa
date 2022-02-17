import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorePageRoutingModule } from './more-routing.module';
import { ShareModulePageModule } from '../share-module/share-module.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorePageRoutingModule,
	ShareModulePageModule
  ],
  declarations: [

  ]
})
export class MorePageModule {}
