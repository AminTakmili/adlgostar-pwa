import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import * as moment from 'jalali-moment';
import { basicYears } from 'src/app/core/models/basicYears.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-extra-salary-item-list',
  templateUrl: './more-extra-salary-item-list.component.html',
  styleUrls: ['./more-extra-salary-item-list.component.scss'],
})
export class MoreExtraSalaryItemListComponent implements OnInit {

	pageTitle: string = "موارد اضاف حقوق";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: contractExtraField[];
	dataInSearch: boolean = false;
	currentYear : number;

	start_year : number ;
	contract_year : number ;

	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService
	) { }

	ngOnInit() {
		// set jalali curent year
		this.currentYear = parseInt(moment().locale('fa').format('YYYY'));
		this.contract_year = this.currentYear;
	}
	async ionViewWillEnter() {
		this.getData();
		this.setTitle();
	}

	ChangeSearch(event:any){
		// this.getData(event.detail.value.toString());
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpGet('salaryBaseInfo/contractExtraFieldList').subscribe(async (res) => {
			await this.global.dismisLoading();
			this.dataList = res.map((item: any) => {
				return new contractExtraField().deserialize(item);
			});
			// console.log(this.dataList);
			// console.log(res);
		}, async (error) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	removeItem(item :  contractExtraField){
		this.global.showAlert('حذف ', 'آیا برای حذف اطمینان دارید؟'+this.pageTitle, [
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
					this.global.httpDelete('salaryBaseInfo/contractExtraField', {
						id: item.id,
					}).subscribe(async (res) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData();

						this.global.showToast(res.msg);

					}, async (error) => {
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
