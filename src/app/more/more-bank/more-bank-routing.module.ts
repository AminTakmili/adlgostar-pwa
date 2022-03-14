import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreBankAddComponent } from './more-bank-add/more-bank-add.component';
import { MoreBankEditComponent } from './more-bank-edit/more-bank-edit.component';
import { MoreBankListComponent } from './more-bank-list/more-bank-list.component';

const routes: Routes = [
	{
		path: '',
		component: MoreBankListComponent
	},
	{
		path: 'add',
		component: MoreBankAddComponent
	},
	{
		path: 'edit/:id',
		component: MoreBankEditComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MoreBankPageRoutingModule { }
