import { MediaEditModalComponent } from './../../media-edit-modal/media-edit-modal.component';
import { MediaAddModalComponent } from './../../media-add-modal/media-add-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { mediafile } from './../../../core/models/media.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-category-files-list',
  templateUrl: './media-category-files-list.component.html',
  styleUrls: ['./media-category-files-list.component.scss'],
})
export class MediaCategoryFilesListComponent implements OnInit {
  pageTitle=" رسانه ها"

  filtered_name:string
  limit:number=24000
  offset:number=0
  total:number
  dataList:mediafile[]
  filtered_category_id:string
  constructor(
    public global:GlobalService,
    private rout:ActivatedRoute,
    public modalController: ModalController

  ) { 
    this.filtered_category_id=rout.snapshot.paramMap.get('id')
  }
  ngOnInit() {
    this.getData()
    // console.log(atob("IxjKJDrxEqJM5fQXg6eU3Q=="));
  }
async  getData(){
  await this.global.showLoading()
    this.global.httpPost('uploadedFile/filteredList',{
     limit: this.limit,
     offset: this.offset,
     filtered_category_id: this.filtered_category_id
  }).subscribe(
   async (res:any) => {
    await this.global.dismisLoading()
    console.log(res);
    this.total=res.totalRows
    // this.dataList=res.list.map((item:mediaCategory)=>{new mediaCategory().deserialize(item)})

    this.dataList = res.list.map((item: mediafile) => {
      return new mediafile().deserialize(item);
    });

    console.log(this.dataList);
   },
   async (error:any) => {
    await this.global.dismisLoading()
    console.log(error);
   }
  )
  }
  // async download(fileBiner:string,name:string){
  //   console.log("object");
  //   const byteArray = new Uint8Array(atob(fileBiner).split('').map(char => char.charCodeAt(0)));

  //   var file = new Blob([byteArray],  { type: "video/mp4" });
  //  var fileURL = URL.createObjectURL(file);
   
  //  const link = document.createElement('a');
  //  link.href = fileURL;
  //  link.download = `  ${name}`;
  //  document.body.append(link);
  //  link.click();
  //  link.remove();
  //  setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  // }
  // download(videoSource: string,name:string,type:string) {
  //   // Create an invisible A element
  //   // const byteArray = new Uint8Array(videoSource.split('').map(char => char.charCodeAt(0)));
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   document.body.appendChild(a);

  //   // Set the HREF to a Blob representation of the data to be downloaded
  //   a.href = window.URL.createObjectURL(
  //     new Blob([videoSource], { type })
  //   );

  //   // Use download attribute to set set desired file name
  //   a.setAttribute("download",name);

  //   // Trigger the download by simulating click
  //   a.click();

  //   // Cleanup
  //   window.URL.revokeObjectURL(a.href);
  //   document.body.removeChild(a);
  // }
  download(url:string,name:string){
    const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);
  
   
      a.href = url
      // Use download attribute to set set desired file name
      a.setAttribute("download",name);
      a.setAttribute("target",'balnk');
  
      // Trigger the download by simulating click
      a.click();
  
      // Cleanup
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    

  }
  async openAddModal() {
		// await this.global.showLoading('لطفا منتظر بمانید...');

		const modal = await this.modalController.create({
			component: MediaAddModalComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			//   presentingElement:this.routerOutlet.nativeEl,
			swipeToClose: true,
			componentProps: {
			
			id:this.filtered_category_id
			},
		});

		modal.onWillDismiss().then(async (res) => {
			if (res.data && res.data.dismissed) {
				// console.log(res.data.city['id'])
				console.log(res);
        this.limit=24000
       this. offset=0
       this.getData()
		
			}
		});
		// 	modal.present().then(async(res) => {
		// 		// console.log(res);
		// 		// console.log("res");
		// 		await this.global.dismisLoading();

		//   });
		return await modal.present();
	}
  
	removeFile(item: any) {
		this.global
			.showAlert(
				'حذف فایل',
			`آیا برای حذف فایل ${item.title} اطمینان دارید؟`,
				[
					{
						text: 'بلی',
						role: 'yes',
					},
					{
						text: 'خیر',
						role: 'cancel',
					},
				]
			)
			.then((alert: any) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('uploadedFile/delete', {
								id: item.id,
							})
							.subscribe(
								async (res: any) => {
									await this.global.dismisLoading();

									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}

  async openEditModal(item:mediafile) {
		// await this.global.showLoading('لطفا منتظر بمانید...');

		const modal = await this.modalController.create({
			component: MediaEditModalComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			//   presentingElement:this.routerOutlet.nativeEl,
			swipeToClose: true,
			componentProps: {
			
        category_id:this.filtered_category_id,
        item
			},
		});

		modal.onWillDismiss().then(async (res) => {
			if (res.data && res.data.dismissed) {
				// console.log(res.data.city['id'])
				console.log(res);
        this.limit=24000
       this. offset=0
       this.getData()
		
			}
		});
		// 	modal.present().then(async(res) => {
		// 		// console.log(res);
		// 		// console.log("res");
		// 		await this.global.dismisLoading();

		//   });
		return await modal.present();
	}
}
