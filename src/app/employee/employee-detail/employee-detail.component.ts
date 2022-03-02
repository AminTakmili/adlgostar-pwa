import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Business } from 'src/app/core/models/business.model';
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {

	pageTitle : string ;
	Employee : Employee;

	constructor(
		public global: GlobalService,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {

	}

	ngOnInit() {
		this.getData(this.route.snapshot.paramMap.get('id'));

	}

	async getData(id : string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('employee/detail', {
			employee_id: id
		}).subscribe(async (res:any) => {

			await this.global.dismisLoading();
			this.pageTitle = this.Employee?.first_name+' '+this.Employee?.first_name;
			this.Employee = new Employee().deserialize(res);
			console.log(this.Employee);
			this.setTitle();


		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	setTitle() {
		this.seo.generateTags({
			title: 'جزییات کسب و کار '+this.Employee?.first_name+' '+this.Employee?.first_name,
			description: 'ویرایش کسب و کار ',
			keywords: 'ویرایش کسب و کار ',
			isNoIndex: false,
		});
	}

}
