import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule
	],
	declarations: [
		SidebarComponent,
	],
	exports : [
		SidebarComponent
	]
})
export class ShareModulePageModule { }
