import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { sideMenu } from 'src/app/core/classes/sideMenu.class';
import { globalData } from 'src/app/core/data/global.data';
import { User } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { StorageService } from 'src/app/core/services/storage.service';


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
		console.log(this.global?.user);
		this.userInfo = await this.global.getUserInfo();


		this.global._user.subscribe((val) => {
			if (val) {
				this.Sidemenu = globalData.menu;

				this.Sidemenu.map(async (item)=>{
					if(item.url){

						item.access = await this.global.checkPersmionByRoute(item.url,item.access);
					}
					if(item.submenu && item.submenu.length){
						item.access = false;
						item.submenu.map(async (sub)=>{
							sub.access = await this.global.checkPersmionByRoute(sub.url,sub.access);
							if(sub.access) {item.access = true;}
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
	async onRouterLinkActive(evenet: any, index: number) {
		// console.log(evenet,index);

		await this.Sidemenu.map(async (item) => { item.state = "close"; });

		if (evenet) { this.Sidemenu[index].state = evenet ? "open" : "close"; }

	}

    async closeMenu() {
        await this.menu.close('mainContent');
    }
}


