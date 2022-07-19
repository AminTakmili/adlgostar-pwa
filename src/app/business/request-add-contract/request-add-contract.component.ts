import { GlobalService } from 'src/app/core/services/global.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/core/models/employee.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-add-contract',
  templateUrl: './request-add-contract.component.html',
  styleUrls: ['./request-add-contract.component.scss'],
})
export class RequestAddContractComponent implements OnInit {
@Input('businessEmployees') businessEmployees: Employee[]
  EmployeesList:Employee[]=[]
addForm:FormGroup
  constructor(
    private fb:FormBuilder,
    public modalController: ModalController,
    public global: GlobalService,

  ) { 
    this.addForm=fb.group({
      Employees:[,Validators.required],
      text:['درخواست قرارداد ']
    })
  }

  ngOnInit() {
    // this.businessEmployees=new Employee().deserialize( this.businessEmployees)
    console.log(this.businessEmployees);
    this.businessEmployees.map((item)=>{
      this.EmployeesList.push(new Employee().deserialize( item))

    })
    
  }
  
 async onSubmit(){
    console.log(this.addForm.value);
    this.addForm.markAllAsTouched()
    if ( this.addForm.valid) {
     await this.global.showLoading()
      let content:string=''
      let li:string=''
      // console.log(content);
      this.addForm.value.Employees.map((item:string)=>{
  
        li=li+`<li>${item}</li>`
      })
      content=` <ul> لیست کارمندان :  ${li} </ul>  <hr>   <p> ${this.addForm.value.text} </p>`
      let section_id:number=21
     let  subject:string='تنظیم قرارداد'
    
      this.global.httpPost('profile/userTicket/add',{content,subject,section_id}).subscribe(
       async (res:any) => {
       await  this.global.dismisLoading()
       console.log(res);
       this.global.showToast('درخواست ثبت قرارداد با موفقیت ثبت شد',500,'top','success','ios')
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
