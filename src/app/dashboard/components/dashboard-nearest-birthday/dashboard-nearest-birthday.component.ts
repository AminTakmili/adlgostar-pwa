import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
	selector: 'app-dashboard-nearest-birthday',
	templateUrl: './dashboard-nearest-birthday.component.html',
	styleUrls: ['./dashboard-nearest-birthday.component.scss'],
})
export class DashboardNearestBirthdayComponent implements OnInit {

	loading: boolean = false;
	limit: number = 20;
	offset: number = 0;
	slideOpts = {
		slidesPerView: 'auto',
		speed: 400
	};
	dataList: Employee[] = [];

	constructor(
		public global: GlobalService
	) { }

	ngOnInit() {
		this.getData();
	}

	async getData() {
		this.loading = true;
		await this.global.httpPost('dashboard/nearbyBirthdays', {
			limit: this.limit,
			offset: this.offset
		}).subscribe(async (res: any) => {
			console.log(res);
			this.dataList = res.list.map((item:any)=>{
				return new Employee().deserialize(item);
			});

		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});
	}

}
