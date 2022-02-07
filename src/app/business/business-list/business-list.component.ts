import { Component, OnInit } from '@angular/core';
import { business } from 'src/app/core/models/business.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { StorageService } from 'src/app/core/services/storage.service';


@Component({
	selector: 'app-business-list',
	templateUrl: './business-list.component.html',
	styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit {

	limit  = 2;
	offset  = 0;
	total  = 0;
	CurrentPage : number = 1;
	end = false;

	businessList : business[]  ;
	constructor(
		public global : GlobalService,
		// private storage: StorageService,
		private seo: SeoService
	) { }

	ngOnInit() {
		 this.getData()
	}

	async getData(){
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('business/list',{
			limit : this.limit,
			offset : this.offset
		}).subscribe(async (res) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.businessList = res.list.map((item)=>{
				return new business().deserialize(item);
			});
			console.log(this.businessList);
			// console.log(res);
		}, async (error) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	PageChange($event) {
		console.log($event)
		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}
}
