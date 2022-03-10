import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

	@Input() title : string;
	constructor(private menu: MenuController) { }

	ngOnInit() { }

	openFirst() {
        this.menu.enable(true, 'mainContent');
        this.menu.open('mainContent');
    }

    openEnd() {
        this.menu.open('end');
    }

    openCustom() {
        this.menu.enable(true, 'mainContent');
        this.menu.open('mainContent');
    }
    async openMenu() {
		await this.menu.open('mainContent');
		this.menu.enable(true, 'mainContent');
    }

    async closeMenu() {
        await this.menu.close();
    }

}
