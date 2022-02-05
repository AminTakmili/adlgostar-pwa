import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../core/guards/login.guard';
import { BusinessAddComponent } from './business-add/business-add.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';

import { BusinessListComponent } from './business-list/business-list.component';

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
    path: 'edit/:businessid',
    component: BusinessEditComponent,
	canActivate: [LoginGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessPageRoutingModule {}
