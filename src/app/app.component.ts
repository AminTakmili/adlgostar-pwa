import { ApplicationRef, Component, ViewChild } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { IonMenu, MenuController, Platform } from '@ionic/angular';
import { User, UserRole } from './core/models/user.model';
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

import { GlobalService } from './core/services/global.service';
import { StaticData } from './core/models/StaticData.model';
import { StorageService } from './core/services/storage.service';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs/internal/observable/interval';
import { permissionsDetail } from 'src/app/core/models/user.model';

// import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	// animations: [
	// 	// Define animation here

	// 	trigger('triggerMenue', [
	// 		state('close', style({
	//             display:'none',

	// 		})),
	// 		state('open', style({
	//             display:'block'
	// 		})),
	// 		transition('close <=> open', animate('10ms ease')),
	// 	]),
	// ]
})
export class AppComponent {
	isLogin: boolean = false;
	isLg!: boolean;

	constructor(
		private platform: Platform,
		private update: SwUpdate,
		private appRef: ApplicationRef,
		public global: GlobalService,
		private menu: MenuController,
		private router: Router,
        private storage: StorageService,
	) {
		this.initializeApp();
		this.updateClient();
		this.checkUpdate();

		this.global._login.subscribe((val) => {
			if (val !== null) {
				this.isLogin = !val;
				this.getData();
			}
		});
		this.router.events.subscribe((event: Event) => {
			// if (event instanceof NavigationStart) {
			//     // Show progress spinner or progress bar
			//     console.log('Route change detected');
			// }

			if (event instanceof NavigationEnd) {
				// Hide progress spinner or progress bar
				// this.currentRoute = event.url;
				// console.log(event);
				this.getUserBadges();
			}

			// if (event instanceof NavigationError) {
			//      // Hide progress spinner or progress bar

			//     // Present error to user
			//     console.log(event.error);
			// }
		});
	}
	ngOnInit() {
		this.getUserPermissions();
	}

	getUserBadges() {
		this.global
			.httpGet('user/getUserBadges')
			.subscribe(async (res: any) => {
				//  console.log(res);
				this.global.badges.next(res);
				//    console.log(  this.global.badges.value.notifications);
			});
	}
	getUserPermissions() {
		this.global
			.httpGet('user/getUserPermissions')
			.subscribe(async (res: any) => {
				// console.log(res.permissions);
				if (res.permissions && res.permissions.length) {
					let permissionsList: permissionsDetail[] = [];
					res.permissions.map((per: any) => {
						if (per.permissions && per.permissions.length) {
							per.permissions.map((item: any) => {
								permissionsList.push(
									new permissionsDetail().deserialize(item)
								);
							});
						}
						if (per.children && per.children.length) {
							per.children.map((item: any) => {
								if (
									item.permissions &&
									item.permissions.length
								) {
									item.permissions.map(
										(childPermissin: any) => {
											permissionsList.push(
												new permissionsDetail().deserialize(
													childPermissin
												)
											);
										}
									);
								}
							});
						}
					});
					// console.log(permissionsList);

                  let  userStorge:User
                   await this.storage.get('user').then((val) => {
                        userStorge=val
                    })
                    userStorge.permissionsList=permissionsList
                    // console.log(userStorge);
                    this.global.user =userStorge;
                    // console.log(this.global.user);
					this.storage.set('user',this.global.user);
					this.global._user.next(this.global.user);
					this.global.setPermision(this.global.user.permissionsList);
				}
			});
	}

	ionSplitPane(e: any) {
		this.isLg = e.detail.visible;
		// if (e.detail.visible) {
		// }else{
		//     this.global?.menueState.next('open')
		//     // this.global?.menueState.next('close')
		// }
	}

	initializeApp() {
		this.platform.ready().then(() => {});
	}

	updateClient() {
		if (!this.update.isEnabled) {
			// console.log('Not Enabled');
			return;
		}
		this.update.available.subscribe((event) => {
			// console.log(`current`, event.current, `available `, event.available);
			this.ShowAlertUpdate();
		});

		this.update.activated.subscribe((event) => {
			// console.log(`current`, event.previous, `available `, event.current);
		});
	}

	checkUpdate() {
		this.appRef.isStable.subscribe((isStable) => {
			if (isStable) {
				const timeInterval = interval(8 * 60 * 60 * 1000);

				timeInterval.subscribe(() => {
					this.update
						.checkForUpdate()
						.then(() => console.log('checked'));
					// console.log('update checked');
				});
			}
		});
	}

	ShowAlertUpdate() {
		this.global
			.showAlert(
				'به روز رسانی',
				'ورژن کنونی قدیمی شده . برای مشاهده نسخه ی جدید سامانه بر روی بروز رسانی کلیک کنید',
				[
					{
						text: 'بروزرسانی',
						handler: () => {
							this.update
								.activateUpdate()
								.then(() => location.reload());
						},
					},
				]
			)
			.then((alert) => {
				alert.present();
			});
	}

	getData() {
		this.global.httpGet('more/enumList').subscribe(
			async (res: any) => {
				const data = new StaticData().deserialize(res);
				this.global.baseData.next(data);
				// console.log(data);
			},
			async (error: any) => {
				this.global.showError(error);
			}
		);
	}

	async closeMenu() {
		await this.menu.close('mainContent');
	}
}
