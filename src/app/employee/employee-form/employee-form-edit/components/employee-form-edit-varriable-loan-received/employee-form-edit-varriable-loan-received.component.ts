import { formTemplateVariable } from './../../../../../core/models/form-template.model';
import { DataSets } from './../../../../../core/models/StaticData.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, concat, of, throwError } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	tap,
} from 'rxjs/operators';

import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';
import { businessClass } from 'src/app/core/classes/business.class';
import { citiesClass } from 'src/app/core/classes/cities.class';
import { globalData } from 'src/app/core/data/global.data'

@Component({
  selector: 'app-employee-form-edit-varriable-loan-received',
  templateUrl: './employee-form-edit-varriable-loan-received.component.html',
  styleUrls: ['./employee-form-edit-varriable-loan-received.component.scss'],
})
export class EmployeeFormEditVarriableLoanReceivedComponent implements OnInit,OnChanges {

  @Input('formTemplateVariableList') formTemplateVariableList:formTemplateVariable[]
  @Input('detailsList') detailsList:any[]

  @Output() variableValues = new EventEmitter<Array<object>>();
  @Output() goBack = new EventEmitter<boolean>();

  disable = true;

	loanDetails: any = [1]

	details: FormArray;
	////////////////////

	loanForm: FormGroup;


//   businessEmployeeId:string
  yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;

	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D'
	}
  date:string

  constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {


    // this.businessEmployeeId=route.snapshot.paramMap.get('id')
		this.loanForm = this.fb.group({
    //   business_employee_id:[this.businessEmployeeId],
			date: ['' , Validators.compose([Validators.required])],
			amount: ['', Validators.compose([Validators.required])],
			details: this.fb.array([]),
      
		
		});
		this.details = this.loanForm.get('details') as FormArray;

	}

	get detailsFormGroup(): FormArray {
		return this.loanForm.get('details') as FormArray;
	}

	newDetails(data?:any): FormGroup {
		return this.fb.group({
			year: [data?.year, Validators.compose([Validators.required])],
			month: [data?.month, Validators.compose([Validators.required])],
			installment_amount: [data?.installment_amount, Validators.compose([Validators.required])],
		
		}) ;
	}

async	ngOnInit() {


		// this.setTitle();
    await this.global.baseData.subscribe((value) => {
			if (value) {
				this.yearsList = value.years;
			}
		});
		this.monthList = this.global.monthList;

    
	}
 async ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // console.log(changes.formTemplateVariableList);
    console.log(changes.detailsList.currentValue);
    // console.log(changes.formTemplateVariableList.currentValue.find((x:any)=>x.variable=='date'));
    // console.log(changes.formTemplateVariableList.currentValue.find((x:any)=>x.variable=='date')?.value);
     this.date=changes.formTemplateVariableList.currentValue.find((x:any)=>x.variable=='date')?.value 
    console.log(this.date);
    this.loanForm.get('amount').setValue( changes.formTemplateVariableList.currentValue.find((x:any)=>x.variable=='amount')?.value)
    // this.loanForm.get('date').setValue( this.date )
   
    // console.log(changes.serten);
    if ( changes.detailsList.currentValue&& changes.detailsList.currentValue.length) {
      
      changes.detailsList.currentValue.map((item:any)=>{
        console.log("object",item);
        this.addAnotherDetails(item)
      })
    }else{
      this.addAnotherDetails()
    }
  }


	
	// setTitle() {
	// 	this.seo.generateTags({
	// 		title: 'افزودن وام جدید',
	// 		description: 'وام جدید ',
	// 		keywords: "وام جدید",
	// 		isNoIndex: false,
	// 	});
	// }


	addAnotherDetails(data?:any) {
		this.loanDetails.push(this.loanDetails.length + 1);
		this.details.push(this.newDetails(data));
		// console.log(this.detailsFormGroup);
	}

	removeDetail(index: number) {

		this.global.showAlert('حذف قسط',
		'آیا برای حذف قسط اطمینان دارید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					this.loanDetails.splice(index, 1);
					this.details.removeAt(index);
				}
			});
		});
	}

	async onSubmit() {

    console.log([this.loanForm.value]);
		this.loanForm.markAllAsTouched();
		if (this.loanForm.valid)
		{
      this.variableValues.emit([this.loanForm.value]);

			// await this.global.showLoading('لطفا منتظر بمانید...');
			// this.global.httpPost('businessEmployee/loan/add', this.loanForm.value)
			// 	.subscribe(async (res:any) => {

      //     console.log(res.employee_id);
			// 		await this.global.dismisLoading();
			// 		// console.log(res:any);
			// 		this.global.showToast('وام جدید با تاریخ ' + this.loanForm.value.date + ' ثبت شد .');
			// 		this.loanForm.reset();
			// 		if(!AddAnOther){
			// 			this.navCtrl.navigateForward('/employees/detail/'+res.employee_id);
			// 		}else{
			// 			location.reload();
			// 		}

			// 	}, async (error:any) => {
			// 		await this.global.dismisLoading();
			// 		this.global.showError(error);
			// 	});
		}
	}
  emitGoBack() {
    
    // this.varriableForm.reset()
      
      this.goBack.emit(true);
    // console.log(this.variableValuesGroup.value);

  }




}
