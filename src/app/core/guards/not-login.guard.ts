import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoginGuard implements CanActivate {
	constructor(
		private navCtrl: NavController,
		private storageService: StorageService
	) { }

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

		// const url: string = state.url;

		const val = await this.storageService.get("isLogin");
		if (!val) {
			return true;
		} else {
			this.navCtrl.navigateRoot('/');
		}
	}

}
