import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Business } from 'src/app/core/models/business.model';
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
	constructor(
		public global: GlobalService,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {
		this.businessId = this.route.snapshot.paramMap.get('businessId');
	}

	ngOnInit() {


	}
	async ionViewWillEnter(){
		this.getData();
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('business/detail', {
			business_id: this.businessId
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.business = new Business().deserialize(res);
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

}
