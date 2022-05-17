import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Employee } from '../core/models/employee.model';
import { GlobalService } from '../core/services/global.service';
import { SeoService } from '../core/services/seo.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.page.html',
	styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

	dataList: Employee[] = [];
	limit: number = 20;
	offset: number = 0;
	total: number = 0;
	loading = false;
	end: boolean = false;
	searchVal : string;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		public alertController: AlertController
	) { }

	ngOnInit() {
		this.getData();
	}
	async getData() {


		if (this.dataList.length > 0 &&  this.end) {
			return;
		}
		this.loading = true;
		this.global.httpPost('employee/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_name : this.searchVal,
		}).subscribe(async (res: any) => {

			this.total = res.totalRows;
			this.loading = false;
			if (res.list.length < this.limit) {
				this.end = true
			}
			this.offset = this.offset + this.limit;
			const data = res.list.map((item: any) => {
				return new Employee().deserialize(item);
				// this.dataList.push(data);


			});
			this.dataList = this.dataList.concat(data);
			// this.dataList.concat(data);
			// console.log(this.dataList);

		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});

	}

	onScrollToEnd() {
		console.log('onScroll');
		// this.getData();
	}

	onScroll({ end }: any) {
		// console.log(end + this.limit, this.dataList.length)
		if (this.loading || this.total <= this.dataList.length) {
			// console.log('end 1');
			return;
		}

		if (end + this.limit >= this.dataList.length) {
			console.log('end 2');
			this.getData();
		}
	}

	searchFun(event:any){
		this.searchVal = event.term;
		this.loading = true;
		this.offset = 0;
		this.end = false;
		this.getData();
	}

}
