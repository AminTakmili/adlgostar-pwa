import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreExtraSalaryItemListComponent } from './more-extra-salary-item-list/more-extra-salary-item-list.component';
import { MoreExtraSalaryItemAddComponent } from './more-extra-salary-item-add/more-extra-salary-item-add.component';
import { MoreExtraSalaryItemEditComponent } from './more-extra-salary-item-edit/more-extra-salary-item-edit.component';


const routes: Routes = [
	{
		path: '',
		component: MoreExtraSalaryItemListComponent
	},
	{
		path: 'add',
		component: MoreExtraSalaryItemAddComponent
	},
	{
		path: 'edit/:id',
		component: MoreExtraSalaryItemEditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MoreExtraSalaryItemPageRoutingModule { }
