import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ImagePipe } from '../core/pipes/image.pipe';

import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ValidatorComponent } from './validator/validator.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmployerCardComponent } from './employer-card/employer-card.component';
import { ImporterListComponent } from './importer-list/importer-list.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule,
		ReactiveFormsModule,
		NgxPaginationModule
	],
	declarations: [
		SidebarComponent,
		HeaderComponent,
		FooterComponent,
		ValidatorComponent,
		EmployeeCardComponent,
		EmployerCardComponent,
		ImagePipe,
		ImporterListComponent
	],
	exports : [
		SidebarComponent,
		HeaderComponent,
		FooterComponent,
		ValidatorComponent,
		EmployeeCardComponent,
		EmployerCardComponent,
		ImagePipe,
		ImporterListComponent
	]

})
export class ShareModulePageModule { }
