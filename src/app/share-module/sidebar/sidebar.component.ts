import { Component, OnInit } from '@angular/core';
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
	]
})
export class SidebarComponent implements OnInit {

	 Sidemenu : sideMenu[] = [
	{
		name: 'داشبورد',
		url: '/',
		icon: 'speedometer',
	},
	{
		name: 'کسب و کار ها',
		url: '/businesses',
		icon: 'business',
	},
	{
		name: 'کارمندان',
		url: '/employees',
		icon: 'people',
	},
	{
		name: 'قرارداد ها',
		url: '/business',
		icon: 'document-text',
	},
	{
		name: 'پروفایل من',
		url: '/business',
		icon: 'person-circle',
		submenu: [
			{
				name: 'ویرایش اطلاعات',
				url: '/business',
				icon: 'create',
			},
			{
				name: 'اطلاعات تماس',
				url: '/business',
				icon: 'call',
			},
			{
				name: 'پشتیبانی',
				url: '/business',
				icon: 'chatbubbles',
			},
			{
				name: 'تغییر شماره همراه',
				url: '/business',
				icon: 'call',
			},
		],

	}
];
	constructor() { }

	ngOnInit() { }

}

function trigger(arg0: string, arg1: any[]): any {
	throw new Error('Function not implemented.');
}

function state(arg0: string, arg1: any): any {
	throw new Error('Function not implemented.');
}

function style(arg0: { height: string; padding: string; }): any {
	throw new Error('Function not implemented.');
}

function transition(arg0: string, arg1: any): any {
	throw new Error('Function not implemented.');
}

function animate(arg0: string): any {
	throw new Error('Function not implemented.');
}

