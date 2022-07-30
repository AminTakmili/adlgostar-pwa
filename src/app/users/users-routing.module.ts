import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [

  {
    path: 'type',
    loadChildren: () => import('./users-type/users-type.module').then( m => m.UsersTypePageModule)
  },
  {
    path: 'role',
    loadChildren: () => import('./users-role/users-role.module').then( m => m.UsersRolePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./users-all/users-all.module').then( m => m.UsersAllPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
