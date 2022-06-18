import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Business } from 'src/app/core/models/business.model';
import { contract } from 'src/app/core/models/contractConstant.model';
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
		public alertController: AlertController,
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

	async removeContractALert(item: contract,businessEmployeeId:number){
		console.log(item);

		this.global.showAlert('حذف '+ item.title , 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes',
				cssClass: 'dark',
			},
			{
				text: 'خیر',
				role: 'cancel',
				cssClass: 'medium',
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {


					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('contract/delete', {
						id: item.id,
						is_group_deleting : 0 ,
						business_employee_ids : [businessEmployeeId]
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();


						this.getData(this.route.snapshot.paramMap.get('id'));

						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}


	removeContract(item : contract , data : number[]){

	}

}
