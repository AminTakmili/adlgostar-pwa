import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-contract-detail',
	templateUrl: './contract-detail.component.html',
	styleUrls: ['./contract-detail.component.scss'],
})
export class ContractDetailComponent implements OnInit {

	pageTitle: string;
	contractExtraFieldList : contractExtraField[];
	dataList: contract;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
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
		this.getData(this.route.snapshot.paramMap.get('id'));
		this.moreData();
	}

	async getData(id : string){
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contract/detail', {
			id: id,
			with_replace : 1 ,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new contract().deserialize(res);
			this.pageTitle = this.dataList.title;
			this.setTitle();

			 console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});


	}

	moreData(){
		const contractExtra = this.global.httpGet('salaryBaseInfo/contractExtraFieldList');
		this.global.parallelRequest([ contractExtra ])
		.subscribe(([ contractExtraRes]) => {
			this.CreatecontractExtra(contractExtraRes);
		});
	}

	CreatecontractExtra(data: any) {
		this.contractExtraFieldList = data.map((item: any) => {
			return new contractExtraField().deserialize(item);
		});
		console.log(this.contractExtraFieldList);
	}

	returnNameExtraField(id : number){
		return this.contractExtraFieldList.find(x=> x.id === id).name;
	}
}
