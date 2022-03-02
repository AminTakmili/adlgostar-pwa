import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { AlertButton, AlertController, LoadingController, NavController, ToastController } from "@ionic/angular";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { environment } from 'src/environments/environment'
import { StaticData } from "../models/StaticData.model";
import { User } from "../models/user.model";
import { StorageService } from "./storage.service";

@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	public loading: any;
	public login: boolean = false;
	public _login = new BehaviorSubject<boolean>(this.login);
	public baseData = new BehaviorSubject<StaticData>(null);
	public user: User;
	public sitename: string = environment.sitename;

	constructor(
		private http: HttpClient,
		private storage: StorageService,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private zone: NgZone,
		public navCtrl: NavController,
		private toastController: ToastController,
	) {

	}


	httpPost(url: string, params: object): Observable<any> {

		const token = (this.login ? this.user.access_token : environment.token)
		let httpOptions;

		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				// 'atriashop-user-id': this.getUserInfo().id.toString()
			})
		};
		return this.http.post<any>(this.getAppUrl(url), JSON.stringify(params), httpOptions);
	}

	httpGet(url: string): Observable<any> {

		const token = (this.login ? this.user.access_token : environment.token)
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + `${token}`,

			})
		};
		return this.http.get<any>(this.getAppUrl(url), httpOptions);

	}

	httpDelete(url: string, params: object): Observable<any> {

		const token = (this.login ? this.user.access_token : environment.token)

		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			}),
			body: params
		};

		return this.http.delete<any>(this.getAppUrl(url), httpOptions);
	}
	httpPatch(url: string, params: object): Observable<any> {
		const token = (this.login ? this.user.access_token : environment.token)

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				// 'atriashop-user-id': this.getUserInfo().id.toString()
			})
		};

		return this.http.patch<any>(this.getAppUrl(url), params, httpOptions);
	}

	httpUpload(url: string, params: object): Observable<any> {

		const token = (this.login ? this.user.access_token : environment.token)
		let httpOptions;

		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				reportProgress: '1',
				observe: 'events'
			})
		};
		return this.http.post<any>(this.getAppUrl(url), JSON.stringify(params), httpOptions);
	}

	getAppUrl(method?: string) {
		if (method === undefined) {
			return environment.apiurl;
		} else {
			return environment.apiurl + method;
		}
	}

	async showLoading(text: string = 'لطفا منتظر بمانید...') {
		this.loading = await this.loadingController.create({
			message: text
		});
		await this.loading.present();

	}

	async dismisLoading() {
		await this.loading.dismiss();
	}

	justNumber(event: any) {
		const pattern = /[0-9.,]/;
		let inputChar = String.fromCharCode(event.charCode);

		if (!pattern.test(inputChar)) {
			// invalid character, prevent input
			event.preventDefault();
		}
	}

	async showError(err: HttpErrorResponse) {
		if (err.status === 403) {
			const alert = await this.alertController.create({
				header: 'عدم دسترسی',
				message: 'تلاش مجدد؟',
				buttons: [
					{
						text: 'خیر',
						role: 'cancel'
					}, {
						text: 'بلی',
						handler: () => {
							this.zone.runOutsideAngular(() => {

								this.changeLogin(false);
								this.storage.clearAll();
								// this.myCart.emptyCart();
								this.navCtrl.navigateRoot('/login')
							});
						}
					}
				]
			});
			await alert.present();
		} else if (err.status === 500 || err.status === 400) {
			const alert = await this.alertController.create({
				header: 'خطا',
				message: err.error.msg,
				buttons: [
					{
						text: 'بستن',
						role: 'cancel'
					}
				]
			});

			await alert.present();
		}
	}

	async showToast(message: string, duration: number = 6000, position: 'top' | 'bottom' | 'middle' = 'top', button? : any) {

		const toast = await this.toastController.create({
			message: message,
			duration: duration,
			position: position,
			buttons: button,
			animated: true,
			mode : 'ios',
			keyboardClose : true ,
			color : 'dark'
		});
		toast.present();
	}

	changeLogin(status: boolean) {
		this._login.next(status);
		this.login = status;
	}

	setUserInfo() {
		this.storage.get('user').then((val) => {
			if (val !== null && val !== undefined && val.id !== undefined) {
				this.changeLogin(true);
				this.user = new User().deserialize(val);
			}
		});
	}

	showAlert(
		header: string,
		message: string,
		buttons: AlertButton[]
	): Promise<any> {
		return this.alertController.create({
			header: header,
			message: message,
			buttons: buttons,
		});
	}

	parallelRequest(requests: any[]) {
		return forkJoin(requests);
	}

	filterItems(data : any, searchTerm : string) {
        return data.filter((item : any) => {
            return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    }
}
