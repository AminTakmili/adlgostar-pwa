import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {


	pageTitle: string = "کارمندان";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: Employee[];
	dataInSearch: boolean = false

	business_id: string;
	filtered_name: string;
	filtered_national_code: string;
	filtered_phone: string;



	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) {

	}

	ngOnInit() {
		this.getData()
	}

	async getData(name: string = '') {

		this.dataInSearch = name ? true : false;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('employee/filteredList', {
			limit: this.limit,
			offset: this.offset,
			business_id: this.business_id,
			filtered_name: this.filtered_name,
			filtered_national_code: this.filtered_national_code,
			filtered_phone: this.filtered_phone,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new Employee().deserialize(item);
			});
			// console.log(this.dataList);
			// console.log(res);
		}, async (error) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});

	}

	pageChange($event: any) {
		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}
	removeItem(item : Employee){

	}

}
