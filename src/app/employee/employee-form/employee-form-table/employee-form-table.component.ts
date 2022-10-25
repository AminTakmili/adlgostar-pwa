import { form } from './../../../core/models/form.model';
import { GlobalService } from './../../../core/services/global.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { formTemplate } from 'src/app/core/models/form-template.model';

@Component({
  selector: 'app-employee-form-table',
  templateUrl: './employee-form-table.component.html',
  styleUrls: ['./employee-form-table.component.scss'],
})
export class EmployeeFormTableComponent implements OnInit,OnChanges {
  @Input('businessEmployeeId') businessEmployeeId:number

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
  dataList:Array<form[]>
  loaded:boolean=false
  formTempeletList: formTemplate[];
  formTempeletObj:any={};
  

  constructor(
    public global:GlobalService
  ) { this.getformFormTempeletData()}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(changes.businessEmployeeId.currentValue      );
    this.getData(changes.businessEmployeeId.currentValue)
  
  }
  
	async getData(filtered_business_employee_id:number) {
		// console.log(this.filtered_confirm_date);
	
    this.loaded=true
		this.global.httpPost('businessEmployee/form/filteredList', {
			limit: this.limit,
			offset: this.offset,
      filtered_business_employee_id
			

		}).subscribe(async (res: any) => {
      this.loaded=false
			this.total = res.totalRows;
			this.dataList = res?.list?.map((item: any) => {
      return  item.business_forms.map((forms:form)=>{	return new form().deserialize(forms);})
			
			});
			console.log(this.dataList);

		}, async (error: any) => {
      this.loaded=false


			this.global.showError(error);
		});
	}

  pageChange($event: any) {

		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		// this.getData();
	}
  removeform(item:form){
    this.global.showAlert('حذف فرم داد', 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert: any) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('businessEmployee/form/delete', {
						id: item.id,
					}).subscribe(async (res: any) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData(this.businessEmployeeId);

						this.global.showToast(res.msg);

					}, async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});

  }
  async getformFormTempeletData() {
		// await this.global.showLoading();
		this.global
			.httpPost('formTemplate/filteredList', {
				limit: 9915,
				offset: 0,
				business_employee_id: this.businessEmployeeId,
			})
			.subscribe(
				async (res: any) => {
					// await this.global.dismisLoading();
					this.formTempeletList = res.list.map((item: formTemplate) => {
           console.log(item.id);
           console.log(item.name);
            this.formTempeletObj[item.id]=item.name
						return new formTemplate().deserialize(item);
					});
          console.log(this.formTempeletList);
          console.log(this.formTempeletObj);
				},
				async (error: any) => {
					// await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

}
