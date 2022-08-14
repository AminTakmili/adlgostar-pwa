import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SettingContractDefinitionSectionComponent } from './setting-contract-definition-section/setting-contract-definition-section.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'contract_definition_section',
	},
	{
		path: 'contract_definition_section',
		component: SettingContractDefinitionSectionComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
