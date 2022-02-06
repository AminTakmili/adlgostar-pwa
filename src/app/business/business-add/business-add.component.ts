import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/core/services/global.service';
import { globalData } from 'src/app/core/data/global.data'
import { cities, countries, provinces } from 'src/app/core/models/countries.model';
import { businessCategory } from 'src/app/core/models/business.model';
import { citiesClass } from 'src/app/core/classes/cities.class';
import { businessClass } from 'src/app/core/classes/business.class';

@Component({
	selector: 'app-business-add',
	templateUrl: './business-add.component.html',
	styleUrls: ['./business-add.component.scss'],
})
export class BusinessAddComponent implements OnInit {

	disable = true;
	employerList = [
		{ id: this.global.user.id, name: this.global.user.firstName + ' ' + this.global.user.lastName, selected: true },
	];
	employer = this.global.user.id;


	////////////////////
	personType = globalData.personType;
	province: citiesClass[] = [];
	businessCatgeories: businessClass[] = [];

	constructor(
		public global: GlobalService
	) { }

	ngOnInit() {
		const countries = this.global.httpGet('more/countries');
		const businessCategory = this.global.httpGet('business-category/list');


		this.global.parallelRequest([countries, businessCategory])
			.subscribe(([countriesData, businessCategory]) => {

				this.setCountry(countriesData);
				this.setBussinessCategory(businessCategory);
			});
	}

	setSelectedPeople() {

	}

	setCountry(data) {
		data[0].provinces.map((province : any) => {
			province.cities.map((city)=>{
				const cities : citiesClass = new citiesClass();
				cities.id = city.id
				cities.name = city.name;
				cities.provinceId = province.id;
				cities.province = province.name;
				this.province.push(cities);
			});
		});
		// this.province = data[0].provinces.map((province : any) => {
		// 	return new provinces().deserialize(province);
		// });
		// console.log(this.province)

	}
	setBussinessCategory(data) {
		 data.map((category : any) => {
			category.child.map((business)=>{
				const businessData : businessClass = new businessClass();
				businessData.id = business.id
				businessData.name = business.name;
				businessData.parentId = category.id;
				businessData.parentName = category.name;
				this.businessCatgeories.push(businessData);
			});
		});
	}



}
