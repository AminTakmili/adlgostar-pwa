import { Component, OnInit } from '@angular/core';
import { sideMenu } from 'src/app/core/classes/sideMenu.class';


@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

	 Sidemenu : sideMenu[] = [
	{
		name: 'کسب و کار ها',
		url: '/business',
		icon: '',
		submenu: [],

	},
	{
		name: 'کسب و کار ها',
		url: '/business',
		icon: '',
		submenu: [],

	},
	{
		name: 'کسب و کار ها',
		url: '/business',
		icon: '',
		submenu: [],

	},
	{
		name: 'کسب و کار ها',
		url: '/business',
		icon: '',
		submenu: [],

	}
];
	constructor() { }

	ngOnInit() { }

}

