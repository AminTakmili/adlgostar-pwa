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
    private rout:ActivatedRoute
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
}
