import { RecognizancePrintComponent } from './recognizance-print/recognizance-print.component';
import { RecognizanceDetailComponent } from './recognizance-detail/recognizance-detail.component';
import { RecognizanceEditComponent } from './recognizance-edit/recognizance-edit.component';
import { RecognizanceAddComponent } from './recognizance-add/recognizance-add.component';
import { RecognizanceListComponent } from './recognizance-list/recognizance-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		redirectTo: 'list',
	},
	{
		path: 'list',
		component: RecognizanceListComponent,
	},
	{
		path: 'add',
		component: RecognizanceAddComponent,
	},
	{
		path: 'add/:businessEmployeeId',
		component: RecognizanceAddComponent,
	},
	{
		path: 'edit',
		redirectTo: 'list',
	},
	{
		path: 'edit/:id',
		component: RecognizanceEditComponent,
	},
	{
		path: 'edit/:id/:businessEmployeeId',
		component: RecognizanceEditComponent,
	},
	{
		path: 'edit',
		redirectTo: 'list',
	},
	{
		path: 'detail',
		redirectTo: 'list',
	},
	{
		path: 'detail/:id',
		component: RecognizanceDetailComponent,
	},
	{
		path: 'print',
		redirectTo: 'list',
	},
	{
		path: 'print/:id',
		component: RecognizancePrintComponent,
	},
	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecognizancePageRoutingModule {}
