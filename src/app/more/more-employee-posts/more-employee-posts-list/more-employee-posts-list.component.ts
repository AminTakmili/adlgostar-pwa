import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/app/core/models/post.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-employee-posts-list',
  templateUrl: './more-employee-posts-list.component.html',
  styleUrls: ['./more-employee-posts-list.component.scss'],
})
export class MoreEmployeePostsListComponent implements OnInit {

	pageTitle: string = "پست های کارمندان";
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: Post[];
	dataInSearch: boolean = false




	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
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
		this.global.httpPost('post/list', {
			limit: this.limit,
			offset: this.offset,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new Post().deserialize(item);
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



	async removeItem(item : Post){
		this.global.showAlert('حذف پست کارمند', 'آیا برای حذف اطمینان دارید؟', [
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
					this.global.httpDelete('post/delete', {
						id: item.id,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();
						this.global.showToast(res.msg);

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData();

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}

}
