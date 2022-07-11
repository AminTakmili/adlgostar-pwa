import { ActivatedRoute } from '@angular/router';
import { SeoService } from './../../../core/services/seo.service';
import { GlobalService } from './../../../core/services/global.service';
import { sentence } from './../../../core/models/sentence.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sentence-detail',
  templateUrl: './sentence-detail.component.html',
  styleUrls: ['./sentence-detail.component.scss'],
})
export class SentenceDetailComponent implements OnInit {
  dataList:sentence
  pageTitle!:string
  constructor(
    public global :GlobalService,
    private seo: SeoService,
    private route: ActivatedRoute,


  ) { }

  ngOnInit() {}
  ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
		// this.moreData();
    console.log(this.dataList);
    console.log(this.dataList?.contract_info?.employers_info);
	}

  
	async getData(id : string){
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contractSentence/detail', {
		id
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
      console.log(res);

			this.dataList = new sentence().deserialize(res);
			this.pageTitle = `حکم قرار داد ${	this.dataList.contract_info.title}`;
			this.setTitle();

			 console.log(this.dataList);
			 console.log(this.dataList.children_allowance_info);
       console.log(this.dataList?.contract_info.employee_info);
       console.log(this.dataList?.contract_info.employers_info);

			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});


	}
  
	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

}
