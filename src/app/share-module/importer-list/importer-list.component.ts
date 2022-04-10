import { Component, Input, OnInit } from '@angular/core';
import { importer } from 'src/app/core/models/other.models';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
	selector: 'app-importer-list',
	templateUrl: './importer-list.component.html',
	styleUrls: ['./importer-list.component.scss'],
})
export class ImporterListComponent implements OnInit {

	@Input() type: string;

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;

	 dataList: importer[];
	constructor(
		public global: GlobalService
	) { }

	ngOnInit() {
		this.getData();
	}

	async getData() {


		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('import/list', {
			limit: this.limit,
			offset: this.offset,
			type: this.type,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new importer().deserialize(item);
			});
			// console.log(this.dataList);
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



}
