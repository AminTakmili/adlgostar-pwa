import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-employer-prev',
	templateUrl: './employer-prev.component.html',
	styleUrls: ['./employer-prev.component.scss'],
})
export class EmployerPrevComponent implements OnInit {

	@Input() data: any;
	@Input() gender: any[];
	@Input() province: any[];

	constructor(
		public modalController: ModalController
	) { }


	ngOnInit() {
		 console.log(this.data);
		// console.log(this.province)
	}

	returnGenderName(name : string){
		const index = this.gender.findIndex(x=>x.value === name);
		return this.gender[index].name ?? name;
	}
	returnprovinceName(id : number){
		const index = this.province.findIndex(x=>x.id === id);
		return this.province[index].province +' - '+this.province[index].name ?? id;
	}

	dismiss() {
		this.modalController.dismiss({
			'dismissed': true
		});
	}

}
