import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { sideMenu } from 'src/app/core/classes/sideMenu.class';
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

	 Sidemenu : sideMenu[] = [
	{
		name: 'داشبورد',
		url: '/',
		icon: 'speedometer',
		submenu :[],
		open : false,
		state : "close",
		function : 'showDetail'
	},
	{
		name: 'کسب و کار ها',
		url: '/businesses',
		icon: 'business',
		submenu :[],
		open : false,
		state : "close",
		function : 'showDetail'
	},
	{
		name: 'کارمندان',
		url: '/employees',
		icon: 'people',
		submenu :[],
		open : false,
		state : "close",
		function : 'showDetail'
	},
	{
		name: 'قرارداد ها',
		url: '/business',
		icon: 'document-text',
		submenu :[],
		open : false,
		state : "close",
		function : 'showDetail'
	},
	{
		name: 'پروفایل من',
		icon: 'person-circle',
		open : false,
		state: "close",
		function : 'showDetail',
		submenu: [
			{
				name: 'ویرایش اطلاعات',
				url: '/business',
				icon: 'create',
				function : 'showDetail'

			},
			{
				name: 'اطلاعات تماس',
				url: '/business',
				icon: 'call',
				function : 'showDetail'
			},
			{
				name: 'پشتیبانی',
				url: '/business',
				icon: 'chatbubbles',
				function : 'showDetail'
			},
			{
				name: 'تغییر شماره همراه',
				url: '/business',
				icon: 'call',
				function : 'showDetail'
			},
			{
				name: 'خروج از حساب کاربری',
				url: '/profile/logout',
				icon: 'log-out-outline',
				function : 'logout'

			},
		],

	}
];
	constructor(
		private global : GlobalService,
		private storage : StorageService,
		public navCtrl: NavController,
	) { }

	ngOnInit() { }


	showDetail(item) {
		if(item.type){}
		if(item.url){
			this.navCtrl.navigateForward([item.url])
		}else{
			item.open = !item.open;
			item.state = item.state === "close" ? "open" : "close";
		}

	}
	logout(item){
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
		.then((alert) => {
			alert.present();
			alert.onDidDismiss().then((e) => {
				if (e.role === 'yes') {
					this.makeLogout();
				}
			});
		});
	}

	private makeLogout(){
		this.global.user = new User;
		this.global.changeLogin(false);
		this.storage.clearAll();
		this.navCtrl.navigateRoot(['/login'])
	}
}


