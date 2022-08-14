import { Component, Input, OnInit } from '@angular/core';

import { GlobalService } from 'src/app/core/services/global.service';
import { MenuController } from '@ionic/angular';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

	@Input() title : string;
    badges!:number
	constructor(private menu: MenuController, public global:GlobalService) { }

	async ngOnInit() { 
        await this.global.badges.subscribe(value => {
			if (value) {
				// this.StaticData = value;
				console.log(value.notifications);
                this.badges=value.notifications
			}
		});
    }

	// openFirst() {
    //     this.menu.enable(true, 'mainContent');
    //     this.menu.open('mainContent');
    // }

    // openEnd() {
    //     this.menu.open('end');
    // }
	async toggleMenu(){
		console.log(1234)
		await this.menu.open('mainContent');
		this.menu.enable(true, 'mainContent');
        if (this.global?.menuState.value=='open') {
            this.global?.menuState.next('close')
        }else{
            this.global?.menuState.next('open')
        }
	}

    // openCustom() {
    //     this.menu.enable(true, 'mainContent');
    //     this.menu.open('mainContent');
    // }
    // async openMenu() {
	// 	await this.menu.open('mainContent');
	// 	this.menu.enable(true, 'mainContent');
    // }

    // async closeMenu() {
    //     await this.menu.close();
    // }

}
