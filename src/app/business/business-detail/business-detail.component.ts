import { RequestAddContractComponent } from './../request-add-contract/request-add-contract.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Business } from 'src/app/core/models/business.model';
import { contract } from 'src/app/core/models/contractConstant.model';
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-business-detail',
	templateUrl: './business-detail.component.html',
	styleUrls: ['./business-detail.component.scss'],
})
export class BusinessDetailComponent implements OnInit {

	pageTitle = "جزییات کسب و کار";
	business : Business;
	businessId;
	businessEmployees : Employee[] = [];
	dataList: contract[];

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	constructor(
		public global: GlobalService,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
		public alertController: AlertController,
		public modalController: ModalController,


	) {
		this.businessId = this.route.snapshot.paramMap.get('businessId');
	}

	ngOnInit() {


	}
	async ionViewWillEnter(){
		this.getData();
		this.getContractData()
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('business/detail', {
			business_id: this.businessId
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.business = new Business().deserialize(res);
			this.businessEmployees = this.business.employees;
			this.setTitle();

		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	setTitle() {
		this.seo.generateTags({
			title: 'جزییات کسب و کار '+this.business?.name,
			description: 'ویرایش کسب و کار ',
			keywords: 'ویرایش کسب و کار ',
			isNoIndex: false,
		});
	}

	removeEmployee(id : any){
		this.global.showAlert('حذف کارمند از کسب و کار', 'آیا برای حذف اطمینان دارید؟', [
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
					this.global.httpDelete('business/employee/delete', {
						business_employee_id: id,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();

						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}

	filterEmployee($event:any){
		const searchTerm = $event.detail.value;
		console.log(this.businessEmployees);
		this.businessEmployees  = this.business.employees.filter(item => {
            return item.full_name.indexOf(searchTerm) > -1;
            // item.full_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
	}
	async getContractData(filtered_title?:string) {
		// await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contract/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_business_id:this.businessId,
			filtered_title
			

		}).subscribe(async (res: any) => {
			// await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new contract().deserialize(item);
			});
			console.log(this.dataList);

		}, async (error: any) => {
			// await this.global.dismisLoading();
			this.global.showError(error);
		});
	}
	pageChangeContract($event: any) {

		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}
	changeFilterContract(event:any) {
		// console.log(event.detail.value);
		this.CurrentPage = 1;
		this.offset = 0;
		this.getContractData(event.detail.value)
	}

	async removeContractALert(item: contract) {

		const employee : any[] = item.employee_info.map((item)=>{
			const input = {
				name: item.full_name,
				type : "checkbox",
				label : item.full_name,
				value : item.business_employee_id,
				checked : false,
			}
			return input;
		});
		console.log(employee);
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: item.title,
			subHeader: 'حذف قرار داد',
			message : ' حذف افراد از قرار داد'+item.title,
			inputs: employee,
			buttons: [
				{
					text: 'بی خیال',
					role: 'cancel',
					cssClass: 'dark',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'حذف کن',
					cssClass: 'medium',
					handler: (alertData) => {
						this.removeContract(item,alertData)
					}
				}
			]
		});

		await alert.present();
	}


	removeContract(item : contract , data : number[]){
		this.global.showAlert('حذف '+ this.pageTitle , 'آیا برای حذف اطمینان دارید؟', [
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
						is_group_deleting : (item.employee_info.length === data.length ? 1 : 0 ) ,
						business_employee_ids : data
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData();

						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}
	
    async openAddContractModal(){
  
		const modal = await this.modalController.create({
		  component: RequestAddContractComponent,
		  cssClass: 'my-custom-class',
		  mode:'ios',
		  swipeToClose:true,
		  componentProps: {
			businessEmployees : this.businessEmployees
		  }
		});
	
		return await modal.present();
	  }
  

}
