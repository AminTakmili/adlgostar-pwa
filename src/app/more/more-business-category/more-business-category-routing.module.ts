import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreBusinessCategoryAddComponent } from './more-business-category-add/more-business-category-add.component';
import { MoreBusinessCategoryEditComponent } from './more-business-category-edit/more-business-category-edit.component';
import { MoreBusinessCategoryListComponent } from './more-business-category-list/more-business-category-list.component';


const routes: Routes = [
	{
		path: '',
		component: MoreBusinessCategoryListComponent
	},
	{
		path: 'add',
		component: MoreBusinessCategoryAddComponent
	},
	{
		path: 'add/:id',
		component: MoreBusinessCategoryAddComponent
	},
	{
		path: 'edit/:id',
		component: MoreBusinessCategoryEditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MoreBusinessCategoryPageRoutingModule { }
