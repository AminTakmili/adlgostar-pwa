import { Component, OnDestroy, OnInit } from '@angular/core';
import { dashboard } from 'src/app/core/models/other.models';
import { GlobalService } from 'src/app/core/services/global.service';
import * as moment from 'jalali-moment';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {

	data: dashboard;
	currentDate: any;
	subscription: Subscription;
	rxTime = new Date();
	intervalId : any;



	constructor(
		public global: GlobalService
	) { }

	ngOnInit() {
		this.getData();
		this.currentDate = moment().locale('fa').format('DD MMMM YYYY');
		console.log(this.currentDate);

		this.subscription = timer(0, 1000)
			.pipe(
				map(() => new Date()),
				share()
			)
			.subscribe(time => {
				this.rxTime = time;
			});
	}

	async getData() {

		// await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpGet('dashboard/getCounts').subscribe(async (res: any) => {

			this.data = new dashboard().deserialize(res);

			// await this.global.dismisLoading();

		}, async (error: any) => {
			// await this.global.dismisLoading();
			this.global.showError(error);
		});

	}

	ngOnDestroy() {
		clearInterval(this.intervalId);
		if (this.subscription) {
		  this.subscription.unsubscribe();
		}
	  }

}
