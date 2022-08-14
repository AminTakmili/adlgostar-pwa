import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';

import { GlobalService } from 'src/app/core/services/global.service';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate {
  constructor(
    private navCtrl : NavController,
		private global : GlobalService ,
	) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     {

      if (this.global.userPermision[route.data.routeName]) {
        return true;  
      }else{
        this.global.showToast('شما مجوز دسترسی به این بخش را ندارید ',1000,'top','danger','ios')
        this.navCtrl.navigateRoot('');
        return false
      }
      
  }
  
}
