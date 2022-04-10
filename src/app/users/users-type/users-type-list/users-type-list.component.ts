import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BusinessCategory } from 'src/app/core/models/business.model';
import { UserRole,  UserType } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-users-type-list',
  templateUrl: './users-type-list.component.html',
  styleUrls: ['./users-type-list.component.scss'],
})
export class UsersTypeListComponent implements OnInit {

	pageTitle: string = "نوع کاربران";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: UserType[];
	dataInSearch: boolean = false

	business_id: string;
	filtered_name: string;
	filtered_national_code: string;
	filtered_phone: string;



	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		public modalController: ModalController
	) {

	}

	ngOnInit() {
		this.setTitle();
	}
	async ionViewWillEnter() {
		this.getData();
	}
	async getData(name: string = '') {

		this.dataInSearch = name ? true : false;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('user/userType/list', {
			type : "all",
			limit: this.limit,
			offset: this.offset,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new UserType().deserialize(item);
			});
			console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});

	}

	pageChange($event: any) {
		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}

	async removeItem(item : UserType){
		this.global.showAlert('حذف نقش کاربر', 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('user/userType/delete', {
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

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

}
