import { Component, Input, OnInit } from '@angular/core';
import { Employer } from 'src/app/core/models/employer.model';

@Component({
	selector: 'app-employer-card',
	templateUrl: './employer-card.component.html',
	styleUrls: ['./employer-card.component.scss'],
})
export class EmployerCardComponent implements OnInit {

	@Input() employer: Employer;
	constructor() { }

	ngOnInit() { }

}
