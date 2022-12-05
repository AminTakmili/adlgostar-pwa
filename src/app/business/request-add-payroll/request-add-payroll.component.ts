import { DataSets } from 'src/app/core/models/StaticData.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalService } from 'src/app/core/services/global.service';
import { ModalController } from '@ionic/angular';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-request-add-payroll',
  templateUrl: './request-add-payroll.component.html',
  styleUrls: ['./request-add-payroll.component.scss'],
})
export class RequestAddPayrollComponent implements OnInit ,OnChanges {
  @Input('businessId') businessId:string
  @Input('payrollDefinitionSectionId') payrollDefinitionSectionId:number
  @Input('businessName') businessName: number
  addForm:FormGroup
  yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;
    constructor(
      private fb:FormBuilder,
      public modalController: ModalController,
      public global: GlobalService,
  
    ) { 
      this.addForm=fb.group({
        month:[,Validators.required],
        year:[,Validators.required],
        text:['درخواست ثبت فیش حقوقی ']
      })
    }
  
 async   ngOnInit() {
  
        await this.global.baseData.subscribe((value) => {
        if (value) {
          this.yearsList = value.years;
        }
      });
      this.monthList = this.global.monthList;
  
   
      
      this.addForm.get('month').setValue( Number(
        moment(new Date(), 'YYYY-M-D HH:mm:ss').locale('fa').format('M')
      ));
      this.addForm.get('year').setValue(Number(
        moment(new Date(), 'YYYY-M-D HH:mm:ss').locale('fa').format('YYYY')
      ));
    }
    ngOnChanges(changes: SimpleChanges) {
    
  
    }
    
   async onSubmit(){
      console.log(this.addForm.value);
      this.addForm.markAllAsTouched()
      if ( this.addForm.valid) {
       await this.global.showLoading()
      //  let content:string= `	<section class="container"><div class="row"><div class="col-6"><ul><li>نام کسب و کار : ${this.businessName}</li><li> ماه : ${this.global.getMonthName[ this.addForm.value.month]}</li><li> سال : ${this.addForm.value.year}</li><li>شناسه کسب و کار : ${this.businessId}</li></ul></div><div class="col-6"><ion-button *ngIf="global.userPermision['payrolls_payroll_add']" shape="round" color="success" href="/payrolls/payroll/add?business_id=${this.businessId}&year=${this.addForm.value.year}&month=${this.addForm.value.month}" ><ion-icon slot="start" name="add-circle"></ion-icon>فیش حقوقی جدید</ion-button></div><hr><p>درخواست ثبت فیش حقوقی </p></div></section>      `

        let content:string=`<section><ul><li>نام کسب و کار : ${this.businessName}</li><li> ماه : ${this.global.getMonthName[ this.addForm.value.month]}</li><li> سال :  <span id="year"> ${this.addForm.value.year}</span></li><li >شناسه کسب و کار : <span id="businessId">${this.businessId}</span></li><li>ماه به عدد :  <span id="month"> ${this.addForm.value.month}</span> </li></ul><hr><p>${this.addForm.value.text}</p></section>`
      
        console.log(content);
        // content=` <ul> لیست کارمندان :  ${li} </ul>  <hr>   <p> ${this.addForm.value.text} </p>`
        let section_id:number=this.payrollDefinitionSectionId
       let  subject:string='تنظیم فیش حقوقی'
     let type="add_payroll_request"
      
        this.global.httpPost('profile/userTicket/add',{content,subject,section_id,type}).subscribe(
         async (res:any) => {
         await  this.global.dismisLoading()
         console.log(res);
         this.global.showToast('درخواست ثبت فیش حقوقی با موفقیت ثبت شد',500,'top','success','ios')
         this.addForm.reset()
         this.modalController.dismiss(null, 'ok')
         },
         async (error:any) => {
           
           console.log(error);
           await  this.global.dismisLoading()
           this.global.showError(error)
  
         }
        )
      }
     
  
    }
  

}
