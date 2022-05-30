import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';



@Component({
	selector: 'app-contract-print',
	templateUrl: './contract-print.component.html',
	styleUrls: ['./contract-print.component.scss'],
})
export class ContractPrintComponent implements OnInit {

	pageTitle: string;
	contractExtraFieldList: contractExtraField[];
	dataList: contract;

	@ViewChild('contract', { static: true }) contract: ElementRef;


	constructor(
		public global: GlobalService,
		private seo: SeoService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() { }

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('contract_id'), this.route.snapshot.paramMap.get('employee_id'),);
		// this.moreData();
	}

	async getData(contract_id: string, employee_id: string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contract/print', {
			contract_id,
			employee_id,
		}).subscribe(async (res: any) => {
			await this.global.dismisLoading();

			this.dataList = new contract().deserialize(res);
			this.pageTitle = this.dataList.title;
			this.setTitle();

			console.log(this.dataList);
			// console.log(res:any);
		}, async (error: any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});


	}

	printContract(id: string) {

		const printContent = document.getElementById(id);
		const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
		WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="/assets/css/print.css" />');
		WindowPrt.document.write(printContent.innerHTML);
		WindowPrt.document.close();

		setTimeout(() => {
			WindowPrt.focus();
			WindowPrt.print();
			WindowPrt.close();
		}, 1000);

	}

	downloadPDF(id: string) {

		const printContent = document.getElementById(id);
		const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
		WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="/assets/css/print.css" />');
		WindowPrt.document.write(printContent.innerHTML);
		WindowPrt.document.close();


	}

}
