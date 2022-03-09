import { Component, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { StaticData } from './core/models/StaticData.model';
import { GlobalService } from './core/services/global.service';
import { StorageService } from './core/services/storage.service';
import {  User, UserRole } from "./core/models/user.model";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	isLogin: boolean = false;
	@ViewChild('sideBarMenu') sideBarMenu: IonMenu;
	constructor(
		public global: GlobalService,
		private storage: StorageService,
		) {

		this.global._login.subscribe((val) => {
			if (val !== null) {
				this.isLogin = !val;
				this.getData();
			}
		});


	}
	getData() {
		this.global.httpGet('more/enumList')
		.subscribe(async (res: any) => {
			const data = new StaticData().deserialize(res);
			this.global.baseData.next(data);
			// console.log(data);

		}, async (error: any) => {
			this.global.showError(error);
		});
	}


}
