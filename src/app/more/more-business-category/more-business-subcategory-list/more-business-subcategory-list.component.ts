import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubBusinessCategory } from 'src/app/core/models/business.model';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
	selector: 'app-more-business-subcategory-list',
	templateUrl: './more-business-subcategory-list.component.html',
	styleUrls: ['./more-business-subcategory-list.component.scss'],
})
export class MoreBusinessSubcategoryListComponent implements OnInit {

	@Input() id: number;
	@Input() name: string;
	@Input() subCategory: SubBusinessCategory[];
	constructor(
		public modalController: ModalController,
		public global: GlobalService,
	) { }

	ngOnInit() {
		console.log(this.name);
		console.log(this.subCategory);
	}

	dismiss() {
		this.modalController.dismiss();
	}
	removeItem(item :SubBusinessCategory ){
		this.global.showAlert('', 'آیا برای حذف اطمینان دارید؟', [
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
					this.global.httpDelete('businessCategory/delete', {
						id: item.id,
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
