import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
	selector: 'app-dashboard-notepad',
	templateUrl: './dashboard-notepad.component.html',
	styleUrls: ['./dashboard-notepad.component.scss'],
})
export class DashboardNotepadComponent implements OnInit {

	loading: boolean = false;
	note : string;
	constructor(public global: GlobalService) { }

	ngOnInit() {
		this.getData();
	}

	async getData() {
		this.loading = true;
		await this.global.httpGet('dashboard/userNote').subscribe(async (res: any) => {
			console.log(res);
			this.note = res.note;
			this.loading = false;
		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});
	}

	async updateNote(){
		//dashboard/userBookmarks
		this.loading = true;
		await this.global.httpPost('user/note/add',{
			note : this.note
		}).subscribe(async (res: any) => {
			console.log(res);
			this.loading = false;
		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});
	}

}
