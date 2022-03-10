import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Business, BusinessList } from 'src/app/core/models/business.model';
import { contract } from 'src/app/core/models/contractConstant.model';
import { Employee } from 'src/app/core/models/employee.model';
import { Employer } from 'src/app/core/models/employer.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-employer-detail',
  templateUrl: './employer-detail.component.html',
  styleUrls: ['./employer-detail.component.scss'],
})
export class EmployerDetailComponent implements OnInit {

	pageTitle : string ;
	employer : Employer;
	businessList : BusinessList[];
	employeeList : Employee[];
	contactList : contract[];

	constructor(
		public global: GlobalService,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {

	}

	ngOnInit() {
		this.getData(this.route.snapshot.paramMap.get('id'));
		this.getExtra(this.route.snapshot.paramMap.get('id'))
	}

	async getData(id : string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('employer/detail', {
			id: id,
		}).subscribe(async (res:any) => {

			await this.global.dismisLoading();
			this.pageTitle = this.employer?.first_name+' '+this.employer?.first_name;
			this.employer = new Employer().deserialize(res);
			console.log(this.employer);
			this.setTitle();


		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	getExtra(id : string){
		const employee = this.global.httpPost('employee/filteredList', {employer_id : id , limit : 200 , offset : 0 });
		const business = this.global.httpPost('employer/business/list',{id : id , limit : 200 , offset : 0 });
		const contract = this.global.httpPost('contract/filteredList',{filtered_employer_id : id , limit : 1000 , offset : 0 });

		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([employee,business,contract])
			.subscribe(([employeeData,businessData = '',contractData = '']) => {

				this.employeeList = this.global.createEmployee(employeeData)
				this.businessList = this.global.createBusiness(businessData);
				this.contactList = this.global.createContract(contractData)

				// this.setBussinessCategory(businessCategory);
			});
	}

	setTitle() {
		this.seo.generateTags({
			title: 'جزییات '+this.employer?.first_name+' '+this.employer?.first_name,
			description:  'جزییات '+this.employer?.first_name+' '+this.employer?.first_name,
			keywords:   'جزییات '+this.employer?.first_name+' '+this.employer?.first_name ,
			isNoIndex: false,
		});
	}

}
