import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ValidatorComponent } from './validator/validator.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmployerCardComponent } from './employer-card/employer-card.component';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule,
		ReactiveFormsModule
	],
	declarations: [
		SidebarComponent,
		HeaderComponent,
		FooterComponent,
		ValidatorComponent,
		EmployeeCardComponent,
		EmployerCardComponent
	],
	exports : [
		SidebarComponent,
		HeaderComponent,
		FooterComponent,
		ValidatorComponent,
		EmployeeCardComponent,
		EmployerCardComponent
	]

})
export class ShareModulePageModule { }
