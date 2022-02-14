import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contract-list',
	templateUrl: './contract-list.component.html',
	styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {

	pageTitle: string = "قرار داد ها";
	constructor() { }

	ngOnInit() { }

}
