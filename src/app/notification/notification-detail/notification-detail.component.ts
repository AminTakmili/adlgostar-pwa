import { notificationType } from 'src/app/core/models/notification.model';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { notification } from './../../core/models/notification.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {
  dataList:notification
  pageTitle:string='جزیات اعلان'
  notificationTypesList:notificationType[]=[]

  constructor(
    private global:GlobalService,
    private route: ActivatedRoute

  ) { }

  async ngOnInit() {
       
		await this.global.baseData.subscribe(value => {
			if (value) {
        this.notificationTypesList = value.notification_types;
				console.log( this.notificationTypesList);
			}
		});
  }
  ionViewWillEnter() {
    this.getData(this.route.snapshot.paramMap.get('id'));
  }

  async getData(id:string){
    await this.global.showLoading()
    this.global.httpPost('notification/detail',{id}).subscribe(
     async (res:any) => {
      await this.global.dismisLoading()
      console.log(res);
      this.dataList=new notification().deserialize(res)
     },
     async (error:any) => {
      await this.global.dismisLoading()

      await this.global.showError(error)


     },
    )
  }
  setTypeName(type:string){
    return  this.notificationTypesList.find((item)=>{return item.value==type}).name
    }

}
