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
		this.getData();

	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('business/detail', {
			business_id: this.businessId
		}).subscribe(async (res) => {

			await this.global.dismisLoading();
			this.business = new Business().deserialize(res);
			this.setTitle();


		}, async (error) => {
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
}
