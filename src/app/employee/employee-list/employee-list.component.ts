import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BusinessList } from 'src/app/core/models/business.model';
import { Employee } from 'src/app/core/models/employee.model';
import { Employer } from 'src/app/core/models/employer.model';
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
	employer_id: string;
	filtered_name: string;
	filtered_national_code: string;
	filtered_phone: string;
	businessList : BusinessList[] = [];
	employersList : Employer[] = [];



	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) {

	}

	ngOnInit() {
		this.getData();
		this.extraData();
		this.setTitle();
	}

	changeSearch(){
		this.pageChange(1);
	}
	async getData(name: string = '') {

		this.dataInSearch = name ? true : false;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('employee/filteredList', {
			limit: this.limit,
			offset: this.offset,
			business_id: this.business_id,
			employer_id: this.employer_id,
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
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	extraData(){
		const businesses = this.global.httpPost('business/filteredList',{ limit : 1000 , offset : 0 });
		const employers = this.global.httpPost('employer/list',{ limit : 1000 , offset : 0 });
		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([businesses , employers])
			.subscribe(([businessesRes , employersRes = '' ]) => {

				this.businessList = this.global.createBusiness(businessesRes);
				this.employersList = this.global.createEmployer(employersRes);

				// this.setBussinessCategory(businessCategory);
			});
	}


	pageChange($event: any) {
		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}
	removeItem(item : Employee){
		this.global.showAlert('حذف کارمند بندی', 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert : any) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('employee/delete', {
						id: item.id,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();
						this.pageChange(1);
						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}

}
