import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';


import { LoginPage } from './login.page';
import { ShareModulePageModule } from '../share-module/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    LoginPageRoutingModule,
	ShareModulePageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
