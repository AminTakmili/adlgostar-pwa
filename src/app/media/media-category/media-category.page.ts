import { IonInput, AlertController } from '@ionic/angular';
import { mediaCategory } from './../../core/models/media.model';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { GlobalService } from 'src/app/core/services/global.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-media-category',
  templateUrl: './media-category.page.html',
  styleUrls: ['./media-category.page.scss'],
  host: {
		'(document:click)': 'onClickAll($event)',
	},

})

export class MediaCategoryPage implements OnInit {
  pageTitle="دسته بندی رسانه"
  filtered_name:string
  limit:number=24000
  offset:number=0
  total:number
  dataList:mediaCategory[]
  menuTopLeftPosition =  {x: '0', y: '0'} 
  contextMenuIsOpen:boolean=false
  editId:number
  
  @ViewChildren('nameInput') nameInputs: QueryList<IonInput>;
  constructor(
    public global:GlobalService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.getData()
  }
async  getData(){
  await this.global.showLoading()
    this.global.httpPost('uploadedFileCategory/filteredList',{
     limit: this.limit,
     offset: this.offset
  }).subscribe(
   async (res:any) => {
    await this.global.dismisLoading()
    console.log(res);
    this.total=res.totalRows
    // this.dataList=res.list.map((item:mediaCategory)=>{new mediaCategory().deserialize(item)})

    this.dataList = res.list.map((item: mediaCategory) => {
      return new mediaCategory().deserialize(item);
    });

    console.log(this.dataList);
   },
   async (error:any) => {
    await this.global.dismisLoading()
    console.log(error);
   }
  )
  }
  edit(id:number,index:number){
    let obj= this.dataList.find((item:any)=>item.id==id)
    console.log(obj);
    obj.editable=false
    this.edit=null
    this.nameInputs.forEach((element,i) => {
      // console.log(element.value==obj.name);
      // console.log(i,element);
      if (i==index) {
        console.log(element.value);
        this.global.httpPatch('uploadedFileCategory/edit',{
          name:element.value,
          id
        }).subscribe(
         async (res:any) => {
          console.log(res);
          obj.name=String( element.value)
          this.editId=null
          
         },
         async (error:any) => {
         await this.global.showError(error)
         element.value=obj.name
         },
        )
        
      }
     
    });
  
    console.log(id);
  }
  clickEditButton(){
    // this.dataList.find(
    //   ( item:any=>{
    //     ru
    //   }))
    console.log("object",this.editId);
    let obj= this.dataList.find((item:any)=>item.id==this.editId)
    console.log(obj);
    obj.editable=true
    this.contextMenuIsOpen=false
   
    this.nameInputs.forEach(element => {
      // console.log(element.value==obj.name);
      if (element.value==obj.name) {
        element.setFocus()
       
      }
    });
  }
  onRightClick(e:any,id:number){
    event.preventDefault()
    // console.log(e);
    // console.log(e.view);
    // console.log(id);
    this.editId=id
    if ( this.contextMenuIsOpen) {
      this.contextMenuIsOpen=!this.contextMenuIsOpen
      setTimeout(() => {
        
        this.contextMenuIsOpen=!this.contextMenuIsOpen
      }, 10);

      
    }else{
      this.contextMenuIsOpen=!this.contextMenuIsOpen

    }

  //  var  windowWidth = e.view.innerWidth;
  //  var windowHeight = e.view.innerHeight;

  //   if ( (windowWidth - e.clientX) < 220 ) {
  //     // this.menuTopLeftPosition.x = e.clientX + 'px'; 

  //     this.menuTopLeftPosition.x = (windowWidth - 220)-0 + "px";
  //   } else {
  //     this.menuTopLeftPosition.x = e.clientX-0 + "px";
  //   }

  //   // this.menuTopLeftPosition.x = clickCoordsY + "px";

  //   if ( Math.abs(windowHeight - e.clientY) < 150 ) {
  //     this.menuTopLeftPosition.x = (windowHeight - 150)-0 + "px";
  //   } else {
      
  //     this.menuTopLeftPosition.x = e.clientY-0 + "px";
  //   }

  //   // this.menuTopLeftPosition.x = e.clientX + 'px'; 
  //   // this.menuTopLeftPosition.y = e.clientY + 'px'; 
  //   // console.log( this.getPosition(e));
   
  }
  onClickAll(e:any){
    console.log(e);
    const contextMenuLabel1 = document.getElementById("contextMenuLabel1");
    const contextMenuLabel2 = document.getElementById("contextMenuLabel2");
    // const contextMenu = document.getElementById("contextMenu");
// let answer = document.getElementById("myDIV")
// document.getElementById("demo").innerHTML = answer;

// console.log(contextMenuLabel1);
//     console.log(e);
//     console.log(e.target);
    console.log(e.target.contains(contextMenuLabel1)||e.target.contains(contextMenuLabel2));

    if (!(e.target.contains(contextMenuLabel1)||e.target.contains(contextMenuLabel2))&&this.contextMenuIsOpen) {
      this.contextMenuIsOpen=false


    }
    // // let obj= this.dataList.find((item:any)=>item.id==this.editId)
    // this.nameInputs.forEach((element,i) => {
    //   // console.log(element.value==obj.name);
    //   // console.log(i,element);
    //   if (!element.readonly) {
     
      
    //     obj.editable=true
    //   }
     
    // });
    
    if (!(e.target.contains(contextMenuLabel1)||e.target.contains(contextMenuLabel2))&&this.editId&&!this.contextMenuIsOpen) {

      this.dataList.map((item:any)=>{
        if (item.editable) {
          item.editable=false
          this.editId=null
        }
      })

    }

  }
  

  async presentAlert() {
    const alert = await this.alertController.create({
   
   
      // header: '',
      header: 'افزودن دسته بندی',
      message:`نام دسته بندی را وارد کنید `,
      mode:'ios',
      inputs: [
        
        {
          // cssClass:'form-input',
          name: 'name',
          type: 'text',
          id: 'token-id',
          attributes: {
            maxlength:5,
            
            autoFocus:true,
            required:true
          }
          // placeholder: 'Placeholder 2'
          
        },
        
        // multiline input.
        
      ],
      buttons: [
        {
          text: 'انصراف',
          role: 'cancel',
          cssClass: 'secondary',
         
        }, {
          text: 'ثبت',
          handler: async(alertData) => {
            // const pattern =/[0-9]/g;
            // let inputChar = String.fromCharCode(alertData.token.charCode);
        
            // console.log( parseInt( alertData.token).toString());
            if (alertData.name&&alertData.name.trim()!='') {
                // this.data=[]
                console.log(alertData.name);
                this.global.httpPost('uploadedFileCategory/add',{name:alertData.name}).subscribe(
                 async (res:any) => {
                  console.log(res);
                  this.getData()
                 },
                 async (error:any) => {
                  console.log(error);
                  await this.global.showError(error)
                 },
                )
               
                
            
              
            }else{
              this.global.showToast('لطفا کد نام را کنید',3000,'bottom','danger','ios')
            }
          }
        }
      ]
    });

    await alert.present();
  }
  

}
