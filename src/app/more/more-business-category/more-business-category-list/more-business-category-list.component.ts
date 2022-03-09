import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BusinessCategory } from 'src/app/core/models/business.model';
import { Employer } from 'src/app/core/models/employer.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { MoreBusinessSubcategoryListComponent } from '../more-business-subcategory-list/more-business-subcategory-list.component';

@Component({
  selector: 'app-more-business-category-list',
  templateUrl: './more-business-category-list.component.html',
  styleUrls: ['./more-business-category-list.component.scss'],
})
export class MoreBusinessCategoryListComponent implements OnInit {

	pageTitle: string = "دسته بندی کسب و کارها";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: BusinessCategory[];
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

	}
	async ionViewWillEnter() {
		this.getData();
	}
	async getData(name: string = '') {

		this.dataInSearch = name ? true : false;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('businessCategory/list', {
			limit: this.limit,
			offset: this.offset,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new BusinessCategory().deserialize(item);
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

	async showSubCategory(item : BusinessCategory){
		const modal = await this.modalController.create({
			component: MoreBusinessSubcategoryListComponent,
			cssClass: 'my-custom-class',
			componentProps : item
		  });
		  return await modal.present();
	}

	async removeItem(item : BusinessCategory){
		this.global.showAlert('حذف کاربر', 'آیا برای حذف اطمینان دارید؟', [
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
					this.global.httpDelete('businessCategory/delete', {
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
