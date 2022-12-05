import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Drivers } from '@ionic/storage';
import { environment } from '../environments/environment';
import { IonicStorageModule } from "@ionic/storage-angular";
import { ShareModulePageModule } from './share-module/share-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { PipeModule } from './core/pipes/pipe.module';
import { AftersecendloadeDirective } from './core/directives/aftersecendloade.directive';

@NgModule({
	declarations: [
		AppComponent,
//   AftersecendloadeDirective
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		RouterModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		NgxPaginationModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerWhenStable:30000'
		}),
		IonicStorageModule.forRoot({
			name: '__adlgostar',
			driverOrder: [Drivers.LocalStorage]
		}),
		ShareModulePageModule,
		PipeModule
	],
	providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
	bootstrap: [AppComponent],
})
export class AppModule { }
