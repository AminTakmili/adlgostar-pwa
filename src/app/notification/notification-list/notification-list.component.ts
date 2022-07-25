import { notification } from './../../core/models/notification.model';
import { notificationType } from 'src/app/core/models/notification.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {

  pageTitle:string="اعلان ها"
  filtered_status:any='all'
  filtered_type:any='all'
  notificationTypesList:notificationType[]=[]
  statusList:notificationType[]=[]
 
	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
  dataList:notification[]=[]

  
  constructor(
    private global:GlobalService
  ) { }

  ngOnInit() {
    this.statusList=[
      new notificationType().deserialize(  {
        name:'همه',
        value:'all'
      })
    ,
      new notificationType().deserialize( {
        name:' دیده نشده',
        value:'unread'
      })
    ,
      new notificationType().deserialize( {
        name:' دیده شده',
        value:'read'
      })
    ,
     
    ]
 

    console.log( this.statusList);
    this.getData()
   
  }
 async ionViewWillEnter() {
      
		await this.global.baseData.subscribe(value => {
			if (value) {
        this.notificationTypesList = value.notification_types;
				console.log( this.notificationTypesList);
			}
		});

  }
  changeFilter(){
    this.offset=0
    this.limit=100
    this.total=0
    this.getData()

  }
  getData(){
  
  this.global.httpPost('notification/filteredList',
  {limit:this.limit,
    offset:this.offset,
    filtered_type:this.filtered_type,
    filtered_status:this.filtered_status
  }).subscribe(
    async (res:any) => {
      this.dataList=res.list.map((i:notification)=>{return new notification().deserialize(i)} ) 
      console.log(this.dataList);
     },
     async (error:any) => {
       this.global.showError(error)
     },
  )
    
	
  }
  setTypeName(type:string){
  return  this.notificationTypesList.find((item)=>{return item.value==type}).name
  }
  pageChange($event: any) {

		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}
}
