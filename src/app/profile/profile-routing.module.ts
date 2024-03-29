import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileChangeNumberComponent } from './profile-change-number/profile-change-number.component';



const routes: Routes = [

  {
    path: 'change-number',
	component : ProfileChangeNumberComponent
  },
  {
    path: 'support',
    loadChildren: () => import('./profile-support/profile-support.module').then( m => m.ProfileSupportPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
