import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SettingContractDefinitionSectionComponent } from './setting-contract-definition-section/setting-contract-definition-section.component';
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
  declarations: [SettingContractDefinitionSectionComponent]
})
export class SettingsPageModule {}
