import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../core/guards/login.guard';
import { BusinessAddComponent } from './business-add/business-add.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BussinesEmployeeAddComponent } from './bussines-employee-add/bussines-employee-add.component';

import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessImporterComponent } from './business-importer/business-importer.component';


const routes: Routes = [
  {
    path: '',
    component: BusinessListComponent,
	canActivate: [LoginGuard]
  },
  {
    path: 'add',
    component: BusinessAddComponent,
	canActivate: [LoginGuard]
  },
  {
    path: 'edit/:id',
    component: BusinessEditComponent,
	canActivate: [LoginGuard]
  },
  {
    path: 'detail/:businessId',
    component: BusinessDetailComponent,
	canActivate: [LoginGuard]
  },
  {
    path: 'add-employee/:id',
    component: BussinesEmployeeAddComponent,
	canActivate: [LoginGuard]
  },
  {
    path: 'importer',
    component: BusinessImporterComponent,
	canActivate: [LoginGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessPageRoutingModule {}
