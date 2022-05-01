import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { bookmarks } from 'src/app/core/models/other.models';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
	selector: 'app-dashboard-bookmark',
	templateUrl: './dashboard-bookmark.component.html',
	styleUrls: ['./dashboard-bookmark.component.scss'],
})
export class DashboardBookmarkComponent implements OnInit {

	loading: boolean = false;
	dataList: bookmarks[] = [];
	limit = 6;
	offset = 0;
	total = 0;
	end = false;
	constructor(
		public global: GlobalService,
		public alertController: AlertController
	) { }

	ngOnInit() {
		this.getData();
	}

	async getData(event: any = undefined, isrefresh = false) {
		//dashboard/finishingContracts


		this.loading = true;
		this.global.httpPost('user/bookmark/list', {
			limit: this.limit,
			offset: this.offset
		}).subscribe(async (res: any) => {


			this.total = res.totalRows;
			res.list.map((item: any) => {
				const data = new bookmarks().deserialize(item);
				this.dataList.push(data);
			});

			if (res.list.length < this.limit) {
				this.end = true;
			}

			if (event !== undefined) {
				event.target.complete();
			}
			// this.firstReq++;
			this.offset += this.limit;

			// console.log("this.end", this.end);

			this.loading = false;
		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});
	}

	async addNewLink() {
		const alert = await this.alertController.create({
			cssClass: 'alert500',
			header: 'افزودن لینک جدید',
			subHeader: 'اطلاعات لینک جدید را وارد کنید',
			inputs: [
				{
					name: 'link',
					type: 'text',
					placeholder: 'آدرس پیوند',
				},
				{
					name: 'title',
					type: 'text',
					placeholder: 'عنوان پیوند',
				},
			],
			buttons: [
				{
					text: 'بیخیال',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						// console.log('Confirm Cancel');
					}
				},
				{
					text: 'ثبت پیوند جدید',
					handler: (data) => {
						if (data.link === '' || data.title === '') {
							this.global.showToast('عنوان یا لینک نمی تواند خالی باشد');
							return false;
						} else {
							this.addLink(data.link, data.title);
						}
					}
				}
			]
		});

		await alert.present();
	}

	addLink(link: string, title: string) {

		this.loading = true
		this.global.httpPost('user/bookmark/add', {
			title: title,
			link: link
		}).subscribe(async (res: any) => {


			const data = new bookmarks().deserialize(res);
			this.dataList.push(data);

			this.loading = false;


		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});
	}

	async editLink(item: bookmarks) {
		const alert = await this.alertController.create({
			cssClass: 'alert500',
			header: 'ویرایش لینک جدید',
			subHeader: 'لینک ' + item.title + ' را ویرایش کنید و ذخیر کنید',
			inputs: [
				{
					name: 'link',
					type: 'text',
					placeholder: 'آدرس پیوند',
					value: item.link,
				},
				{
					name: 'title',
					type: 'text',
					placeholder: 'عنوان پیوند',
					value: item.title,
				},
			],
			buttons: [
				{
					text: 'بیخیال',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						// console.log('Confirm Cancel');
					}
				},
				{
					text: 'ویرایش پیوند',
					handler: (data) => {
						if (data.link === '' || data.title === '') {
							this.global.showToast('عنوان یا لینک نمی تواند خالی باشد');
							return false;
						} else {
							this.updateLink(item, data.link, data.title);
						}
					}
				}
			]
		});

		await alert.present();

	}

	updateLink(item: bookmarks, link: string, title: string) {
		this.loading = true
		this.global.httpPatch('user/bookmark/edit', {
			title: title,
			link: link,
			id : item.id
		}).subscribe(async (res: any) => {


			// const data = new bookmarks().deserialize(res);
			// this.dataList.push(data);
			item.link = link ;
			item.title = title;
			this.loading = false;


		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});
	}
	remove(item: bookmarks) {
		this.global.showAlert(' حذف پیوند '+item.title,
		'آیا برای حذف این پیوند اطمینان دارید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					this.removeLink(item)
				}
			});
		});
	}

	removeLink(item: bookmarks){

		this.loading = true
		this.global.httpDelete('user/bookmark/delete', {
			id : item.id
		}).subscribe(async (res: any) => {

			const index = this.dataList.findIndex(x=>x.id===item.id)
			this.dataList.splice(index,1);
			this.loading = false;

		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});

	}
}
