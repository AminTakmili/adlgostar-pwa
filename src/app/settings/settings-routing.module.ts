import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SettingAddSectionComponent } from './setting-add-section/setting-add-section.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'contract_definition_section',
	},
	{
		path: 'contract_add_section',
		component: SettingAddSectionComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
