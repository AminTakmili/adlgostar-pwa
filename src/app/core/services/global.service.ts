import { AlertButton, AlertController, LoadingController, NavController, ToastController } from "@ionic/angular";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { DataSets, badges } from './../models/StaticData.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { User, UserRole, permissionsDetail } from "../models/user.model";

import { Bank } from "../models/bank.model";
import { BusinessList } from "../models/business.model";
import { Employee } from "../models/employee.model";
import { Employer } from "../models/employer.model";
import { FormGroup } from "@angular/forms";
import { StaticData } from "../models/StaticData.model";
import { StorageService } from "./storage.service";
import { citiesClass } from "../classes/cities.class";
import { contract } from "../models/contractConstant.model";
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	public loading: any;
	public login: boolean = false;
	public _login = new BehaviorSubject<boolean>(this.login);
	public baseData = new BehaviorSubject<StaticData>(null);
	public badges = new BehaviorSubject<badges>(null);
	public menuState = new BehaviorSubject<string>('open');
	public user: User;
	public _user =  new BehaviorSubject<User>(null);
	public sitename: string = environment.sitename;
	public userPermision  : LooseObject = {};
	public monthList  : Array<{
		name:string,
		number:number
	}> = [];
	public	getMonthName:string[] =[
		"",
		"فروردین",
		"اردیبهشت",
		"خرداد",
		"تیر",
		"مرداد",
		"شهریور",
		"مهر",
		"آبان",
		"آذر",
		"دی",
		"بهمن",
		"اسفند"
	]
	countClick:number=0

	constructor(
		private http: HttpClient,
		private storage: StorageService,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private zone: NgZone,
		public navCtrl: NavController,
		private toastController: ToastController,
	) {
		this.setUserInfo();
		const monthNames=[
			"فروردین",
			"اردیبهشت",
			"خرداد",
			"تیر",
			"مرداد",
			"شهریور",
			"مهر",
			"آبان",
			"آذر",
			"دی",
			"بهمن",
			"اسفند"
		]
		monthNames.map((monthName,monthIndex)=>{
			this.monthList.push(
				{
					name:monthName,
					number:monthIndex+1
				}
			)
		})
	
		
	}
	dbClick(url:[string,any]|string){
		this.countClick++
		// console.log(this.countClick);
		if (this.countClick==2) {
			// console.log("object");
			this.navCtrl.navigateForward(url)
			this.countClick=0
		}else if(this.countClick>2){
			this.countClick=0
		}else{
			setTimeout(() => {
				this.countClick=0
			}, 600);
		}
	}
	


	httpPost(url: string, params: object): Observable<any> {

		const token = (this.login ? this.user.access_token : environment.token)
		let httpOptions;

		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				devicePixelRatio: '1024',
				// responseType:responseType?responseType:''
				// 'atriashop-user-id': this.getUserInfo().id.toString()
			}),
			// observe:'"events"',
			// responseType: '"blob"'
			// responseType: 'text'
			// responseType:responseType
		};
		return this.http.post<any>(this.getAppUrl(url), JSON.stringify(params), httpOptions);
	}

	httpPostFormData(url: string, params: object): Observable<any> {

		const token = (this.login ? this.user.access_token : environment.token)
		let httpOptions;

		httpOptions = {
			headers: new HttpHeaders({
				Authorization: `Bearer ${token}`,
				devicePixelRatio: '1024'
				// 'atriashop-user-id': this.getUserInfo().id.toString()
			})
		};
		return this.http.post<any>(this.getAppUrl(url), params , httpOptions);
	}

	httpGet(url: string): Observable<any> {

		const token = (this.login ? this.user.access_token : environment.token)
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + `${token}`,

			})
		};
		// but this does NOT work

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

	async getUserInfo() {
		return await this.user;
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
	// async showToast(message: string, duration: number = 6000, position: 'top' | 'bottom' | 'middle' = 'top', button? : any) {

	async showToast(message: string, duration: number = 6000, position: 'top' | 'bottom' | 'middle' = 'top',color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'dark' | 'medium' | 'light' | string='dark',mode?:'ios'|'md', button?: any) {

		const toast = await this.toastController.create({
			message: message,
			duration: duration,
			position: position,
			buttons: button,
			animated: true,
		
			keyboardClose: true,
		
			color:color,
			mode:mode,
		});
		toast.present();
	}

	changeLogin(status: boolean) {
		this._login.next(status);
		this.login = status;
	}

	setUserInfo() {
		this.storage.get('user').then((val) => {
			if (Object.keys(val).length) {
				this.changeLogin(true);
				this.user = new User().deserialize(val);
				this._user.next(this.user);
				this.setPermision(this.user.permissionsList);
				
			}
		});
	}

	setPermision(persmion : permissionsDetail[]){
		// console.log("object");
		// console.log(persmion);

		persmion.map((item:permissionsDetail)=>{
			this.userPermision[item.en_name] =  item.access;
			// if(item.children && item.children.length){
			// 	item.children.map((child:permissionsDetail)=>{

			// 	})
			// }
		});
	}

	showAlert(
		header: string,
		message: string,
		buttons: AlertButton[],
		subHeader : string = '',
	): Promise<any> {
		return this.alertController.create({
			header: header,
			message: message,
			buttons: buttons,
			subHeader: subHeader,
		});
	}

	parallelRequest(requests: any[]) {
		return forkJoin(requests);
	}

	filterItems(data: any, searchTerm: string) {
		return data.filter((item: any) => {
			return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});
	}

	justNumber(event: any) {
		const pattern = /[0-9.,]/;
		let inputChar = String.fromCharCode(event.charCode);

		if (!pattern.test(inputChar)) {
			// invalid character, prevent input
			event.preventDefault();
		}
	}
	justWord(event: any) {
		const pattern = /[0-9.,]/;
		let inputChar = String.fromCharCode(event.charCode);

		if (pattern.test(inputChar)) {
			// invalid character, prevent input
			event.preventDefault();
		}
	}

	createEmployer(data: any) {
		return data.list.map((item: any) => {
			return new Employer().deserialize(item);
		});
	}
	createEmployee(data: any) {
		return data.list.map((item: any) => {
			return new Employee().deserialize(item);
		});
	}
	createBusiness(data: any) {
		return data.list.map((item: any) => {
			return new BusinessList().deserialize(item);
		});
	}
	createContract(data: any) {
		return data.list.map((item: any) => {
			return new contract().deserialize(item);
		});
	}
	createBank(data: any) {
		return data.list.map((item: any) => {
			return new Bank().deserialize(item);
		});
	}
	createCountry(data: any) {
		let provinceList: citiesClass[] = [];
		data[0].provinces.map((province: any) => {
			province.cities.map((city: any) => {
				const cities: citiesClass = new citiesClass();
				cities.id = city.id
				cities.name = city.name;
				cities.provinceId = province.id;
				cities.province = province.name;
				provinceList.push(cities);
			});
		});
		return provinceList;
	}

	createUserRole(data: any) {
		return data.list.map((item: any) => {
			return new UserRole().deserialize(item);
		});
	}

	async checkPersmionByEnName(name: string) {
		return true;
		// const permison = this.user.permissionsList.find(x => x.en_name === name);
		// const access = permison !== undefined ? permison.access : true;
		// // console.log(name,access)
		// return access;
	}
	async checkPersmionByRoute(route: string,accessDefault : boolean = false) {
		if(accessDefault){
			return true;
		}
		// console.log(this.user.permissionsList);
		const permison = this.user.permissionsList.find(x => x.app_route === route);
		// console.log(route,permison);
		const access = permison !== undefined ? permison.access : false;
		return access;
	}

	emptyFrom(form:FormGroup){
		this.showAlert(
			'پاک کردن فرم',
			 'آیا برای پاک کردن فرم اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert: any) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					form.reset()
				}
			});
		});
	}

}
interface LooseObject {
    [key: string]: any
}
