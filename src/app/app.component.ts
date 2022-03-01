import { Component, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { GlobalService } from './core/services/global.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	isLogin : boolean = false;
	@ViewChild('sideBarMenu') sideBarMenu: IonMenu;
	constructor(public global: GlobalService) {
		this.global.setUserInfo();
		this.global._login.subscribe((val) => {
			if(val !== null){
				this.isLogin = !val;
			}
		});

	}

}
