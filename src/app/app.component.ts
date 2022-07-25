import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApplicationRef, Component, ViewChild } from '@angular/core';
import { IonMenu, MenuController, Platform } from '@ionic/angular';
import { StaticData } from './core/models/StaticData.model';
import { GlobalService } from './core/services/global.service';
import { StorageService } from './core/services/storage.service';
import { User, UserRole } from "./core/models/user.model";
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs/internal/observable/interval';

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
	isLg!: boolean ;

	constructor(
		private platform: Platform,
		private update: SwUpdate,
		private appRef: ApplicationRef,
		public global: GlobalService,
		private menu: MenuController
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


	}
    ionSplitPane(e:any){
        console.log(e,'e');
        console.log(e.detail.visible);
        this.isLg=e.detail.visible
        // if (e.detail.visible) {
        // }else{
        //     this.global?.menueState.next('open')
        //     // this.global?.menueState.next('close')
        // }
    }

	initializeApp() {
        this.platform.ready().then(() => { });
    }

	updateClient() {
        if (!this.update.isEnabled) {
            // console.log('Not Enabled');
            return;
        }
        this.update.available.subscribe((event) => {
            // console.log(`current`, event.current, `available `, event.available);
            this.ShowAlertUpdate()

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
                    this.update.checkForUpdate().then(() => console.log('checked'));
                    // console.log('update checked');
                });
            }
        });
    }

	ShowAlertUpdate() {
        this.global.showAlert('به روز رسانی',
            'ورژن کنونی قدیمی شده . برای مشاهده نسخه ی جدید سامانه بر روی بروز رسانی کلیک کنید', [
            {
                text: 'بروزرسانی',
                handler: () => {
                    this.update.activateUpdate().then(() => location.reload());
                }
            }
        ]).then((alert) => {
            alert.present();
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


	async closeMenu() {

		await this.menu.close('mainContent');
	}

}
