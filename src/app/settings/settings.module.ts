import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SettingAddSectionComponent } from './setting-add-section/setting-add-section.component';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
  ],
  declarations: [SettingAddSectionComponent]
})
export class SettingsPageModule {}
