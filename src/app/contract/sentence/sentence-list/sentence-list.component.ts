import { sentence } from './../../../core/models/sentence.model';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from './../../../core/services/seo.service';
import { GlobalService } from './../../../core/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sentence-list',
  templateUrl: './sentence-list.component.html',
  styleUrls: ['./sentence-list.component.scss'],
})
export class SentenceListComponent implements OnInit {
  dataList!:Array<sentence>
  id:string
  
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
  pageTitle!:string
  contractsTitle!:string
  constructor(
    public global :GlobalService,
    private seo: SeoService,
    private route: ActivatedRoute,


  ) { 
    this.id=route.snapshot.paramMap.get('id')

  }

  ngOnInit() {}
  ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
		// this.moreData();
    console.log(this.dataList);
    // console.log(this.dataList?.contract_info?.employers_info);
	}

  
	async getData(id : string){
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contractSentence/filteredList', {
			filtered_contract_id: id,
			offset : this.offset ,
			limit :this.limit,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();
      console.log(res);
      this.total = res.totalRows;
      // let domyList:[sentence]=[new sentence().deserialize( res.list[0])]
      this.dataList= res.list.map((item:sentence,index:number)=>{
   
         return(new sentence().deserialize(item))
        
      })
      console.log(this.dataList);
    
			this.pageTitle = `حکم های قرار داد ${	this.dataList[0].contract_info.title}`;
			this.contractsTitle = 	this.dataList[0].contract_info.title;
			this.setTitle();

			 console.log(this.dataList);
      //  console.log(this.dataList?.contract_info.employee_info);
      //  console.log(this.dataList?.contract_info.employers_info);

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
  pageChange($event: any) {

		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData(this.route.snapshot.paramMap.get('id'));
	}
	
	removeContract(id:number,date:string){
		this.global.showAlert('حذف حکم تاریخ  '+ date , 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes',
				cssClass: 'dark',
			},
			{
				text: 'خیر',
				role: 'cancel',
				cssClass: 'medium',
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {


					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('contractSentence/delete', {
						id
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData(this.route.snapshot.paramMap.get('id'));

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
