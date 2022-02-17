import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	constructor(
		private navCtrl : NavController,
		private storageService : StorageService,
		private global : GlobalService ,
	) { }

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

		// const url: string = state.url;
		const val = await this.storageService.get("user");
		// console.log('login',val);
		if (val !== null || this.global.login ) {
			return true;
		} else {
			this.navCtrl.navigateRoot('/login');
		}

	}

}
