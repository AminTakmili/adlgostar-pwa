import { BusinessReportListModalComponent } from './../business-report/business-report-list-modal/business-report-list-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController, ModalController } from '@ionic/angular';
import { debounceTime, map } from 'rxjs/operators';

import { BusinessList } from 'src/app/core/models/business.model';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { fromEvent } from 'rxjs';

@Component({
	selector: 'app-business-list',
	templateUrl: './business-list.component.html',
	styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit {

	pageTitle: string = "کسب کار ها";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: BusinessList[];
	dataInSearch: boolean = false;
	filtered_name:string;
	

	@ViewChild('Search') Search: IonInput;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		public modalController: ModalController,

	) {

	}

	ngOnInit() {
		this.setTitle()
	}

	async ionViewWillEnter() {
		this.getData();
	}

	async getData() {


		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('business/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_name: this.filtered_name,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new BusinessList().deserialize(item);
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
	pageChange($event: any) {
		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}

	async removeItem(item : BusinessList){
		this.global.showAlert('حذف کسب و کار', 'آیا برای حذف اطمینان دارید؟', [
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
					this.global.httpDelete('business/delete', {
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
	async openAddContractModal(id:number) {
		const modal = await this.modalController.create({
			component: BusinessReportListModalComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			swipeToClose: true,
			componentProps: {
			id
			},
		});

		return await modal.present();
	}


}


