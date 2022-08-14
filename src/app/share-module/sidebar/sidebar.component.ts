import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { GlobalService } from 'src/app/core/services/global.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { User } from 'src/app/core/models/user.model';
import { globalData } from 'src/app/core/data/global.data';
import { sideMenu } from 'src/app/core/classes/sideMenu.class';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	animations: [
		// Define animation here
		trigger('openAnimation', [
			state('close', style({
				height: '0px',
				padding: '0'
			})),
			state('open', style({
				height: '*',
				padding: '5px 0'
			})),
			transition('close <=> open', animate('300ms ease')),
		]),
		trigger('openSumIconAnimation', [
			state('close', style({
				transform: 'rotate(0deg)',
				
			})),
			state('open', style({
				transform: 'rotate(180deg)',
				// color:'var(--ion-color-primary)'
			})),
			transition('close <=> open', animate('300ms ease')),
		]),
		
	]
})
export class SidebarComponent implements OnInit {

	Sidemenu: sideMenu[] = [];

	userInfo: User;
	check = false;
	constructor(
		public global: GlobalService,
		private storage: StorageService,
		public navCtrl: NavController,
		private menu: MenuController
	) { }

	async ngOnInit() {
		// console.log(this.global?.user);
		this.userInfo = await this.global.getUserInfo();


		this.global._user.subscribe((val) => {
			if (val) {
				this.Sidemenu = globalData.menu;

				this.Sidemenu.map(async (item)=>{
					if(item.url){

						item.access = await this.global.checkPersmionByRoute(item.url,item.access);
					}
					// console.log(item);
					if(item.submenu && item.submenu.length){
						item.access = false;
						item.submenu.map(async (sub)=>{
							// console.log(sub);
							sub.access = await this.global.checkPersmionByRoute(sub.url,sub.access);
							if(sub.access) {item.access = true;}
							if (sub.childeren&&sub.childeren.length) {
								
								sub?.childeren?.map(async (child)=>{
									// console.log(child);
									child.access = await this.global.checkPersmionByRoute(child.url,child.access);
									if(child.access) {sub.access = true;}
									
								})
							}
						})
					}
				});
				this.check = true;

			}
		});

	}


	routerClickFun(item:any){
		if(item.function === "showDetail"){
			this.showDetail(item)
		}else if(item.function === "logout"){
			this.logout(item);
		}
	}
	showDetail(item: any) {
		// console.log(item);
		if (item.type) { }
		if (item.url) {
			this.navCtrl.navigateForward([item.url]);
			this.closeMenu();
		} else {
			item.open = !item.open;
			item.state = item.state === "close" ? "open" : "close";
		}

	}
	logout(item: any) {
		this.global
			.showAlert('خروج از حساب کاربری', 'آیا برای خروج اطمینان دارید ؟', [
				{
					text: 'خیر',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'بلی',
					role: 'yes',
				},
			])
			.then((alert: any) => {
				alert.present();
				alert.onDidDismiss().then((e: any) => {
					if (e.role === 'yes') {
						this.makeLogout();
					}
				});
			});
	}

	private makeLogout() {
		this.global.user = new User;
		this.global.changeLogin(false);
		this.storage.clearAll();
		this.navCtrl.navigateRoot(['/login'])
	}
	async onRouterLinkActive(evenet: any, index: number,subIndex?:number,childIndex?:number,isChild:boolean=false) {
		// console.log(evenet,index);

		await this.Sidemenu.map(async (item) => { item.state = "close"; });

		if (evenet) { this.Sidemenu[index].state = evenet ? "open" : "close"; }

		if (isChild) {
			if (evenet) { this.Sidemenu[index].submenu[subIndex].state = evenet ? "open" : "close"; }

		}
		
	}

    async closeMenu() {
        await this.menu.close('mainContent');
    }
}


