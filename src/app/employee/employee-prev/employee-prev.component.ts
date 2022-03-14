import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StaticData } from 'src/app/core/models/StaticData.model';

@Component({
	selector: 'app-employee-prev',
	templateUrl: './employee-prev.component.html',
	styleUrls: ['./employee-prev.component.scss'],
})
export class EmployeePrevComponent implements OnInit {

	@Input() data: any;
	@Input() StaticData: StaticData;
	@Input() province: any[];
	@Input() bank: any[];

	constructor(
		public modalController: ModalController
	) { }

	ngOnInit() {
		console.log(this.data)
	}

	returnGenderName(name : string){
		const index = this.StaticData.gender.findIndex(x=>x.value === name);
		if(index !== -1){
		return this.StaticData.gender[index].name ?? name;
		}else{
			return name;
		}
	}

	returnDegree(id : number){
		const index = this.StaticData.degree.findIndex(x=> x.id === id);
		if(index !== -1){
		return this.StaticData.degree[index].name ?? id;
		}else{
			return id;
		}
	}



	returnprovinceName(id : number){
		const index = this.province.findIndex(x=>x.id === id);
		if(index !== -1){
			return this.province[index].province +' - '+this.province[index].name ?? id;
		}else{
			return id;
		}
	}

	returnMilitaryInformation(value : string){
		const index = this.StaticData.military_status.findIndex(x=> x.value === value);
		if(index !== -1){
			return this.StaticData.military_status[index].name ?? value;
			}else{
				return value;
			}
	}

	returnMaritalStatus(value : string){
		const index = this.StaticData.maritalStatus.findIndex(x=> x.value === value);
		if(index !== -1){
			return this.StaticData.maritalStatus[index].name ?? value;
			}else{
				return value;
			}
	}

	returnBankName(id: number){
		const index = this.bank.findIndex(x=> x.id === id);
		if(index !== -1){
		return this.bank[index].name ?? id;
		}else{
			return id;
		}
	}

	dismiss() {
		this.modalController.dismiss({
			'dismissed': true
		});
	}

}
