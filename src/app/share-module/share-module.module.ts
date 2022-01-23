import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,

	],
	declarations: [
		SidebarComponent,
	],
	exports : [
		SidebarComponent
	]
})
export class ShareModulePageModule { }
