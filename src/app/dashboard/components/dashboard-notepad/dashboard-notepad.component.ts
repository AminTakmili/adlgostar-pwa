import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
	selector: 'app-dashboard-notepad',
	templateUrl: './dashboard-notepad.component.html',
	styleUrls: ['./dashboard-notepad.component.scss'],
})
export class DashboardNotepadComponent implements OnInit {

	loadding: boolean = false;
	note : string;
	constructor(public global: GlobalService) { }

	ngOnInit() {
		this.getData();
	}

	async getData() {
		this.loadding = true;
		await this.global.httpGet('dashboard/userNote').subscribe(async (res: any) => {
			console.log(res);
			this.note = res.note;
			this.loadding = false;
		}, async (error: any) => {
			this.loadding = false;
			this.global.showError(error);
		});
	}

	async updateNote(){
		//dashboard/userBookmarks
		this.loadding = true;
		await this.global.httpPost('user/note/add',{
			note : this.note
		}).subscribe(async (res: any) => {
			console.log(res);
			this.loadding = false;
		}, async (error: any) => {
			this.loadding = false;
			this.global.showError(error);
		});
	}

}
