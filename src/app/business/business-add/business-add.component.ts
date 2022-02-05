import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
	selector: 'app-business-add',
	templateUrl: './business-add.component.html',
	styleUrls: ['./business-add.component.scss'],
})
export class BusinessAddComponent implements OnInit {



	disable = true;
	items = [
		{ id: this.global.user.id , name: this.global.user.firstName+' '+this.global.user.lastName , selected : true },
	];
	people;

	constructor(
		public global : GlobalService
	) { }

	ngOnInit() {

	}

	setSelectedPeople() {

	}

}
