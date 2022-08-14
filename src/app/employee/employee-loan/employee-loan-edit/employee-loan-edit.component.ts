import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
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

import { DataSets } from './../../../core/models/StaticData.model';
import { Employer } from './../../../core/models/employer.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';
import { async } from '@angular/core/testing';
import { businessClass } from 'src/app/core/classes/business.class';
import { citiesClass } from 'src/app/core/classes/cities.class';
import { globalData } from 'src/app/core/data/global.data';

@Component({
	selector: 'app-employee-loan-edit',
	templateUrl: './employee-loan-edit.component.html',
	styleUrls: ['./employee-loan-edit.component.scss'],
})
export class EmployeeLoanEditComponent implements OnInit {
	disable = true;

	loanDetails: any = [1];

	details: FormArray;
	////////////////////

	loanForm: FormGroup;

	businessEmployeeId: string;
	id: string;
	yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute
	) {
		this.businessEmployeeId = route.snapshot.paramMap.get('bEmId');
		this.id = route.snapshot.paramMap.get('id');
		this.loanForm = this.fb.group({
			business_employee_id: [this.businessEmployeeId],
			id: [this.id],
			date: [, Validators.compose([Validators.required])],
			amount: ['', Validators.compose([Validators.required])],
			details: this.fb.array([]),
		});
		this.details = this.loanForm.get('details') as FormArray;
	}

	get detailsFormGroup(): FormArray {
		return this.loanForm.get('details') as FormArray;
	}

	newDetails(year?:number,month?:number,installment_amount?:number): FormGroup {
		return this.fb.group({
			year: [year, Validators.compose([Validators.required])],
			month: [month, Validators.compose([Validators.required])],
			installment_amount: [installment_amount, Validators.compose([Validators.required])],
		});
	}

	async ngOnInit() {
		this.setTitle();
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.yearsList = value.years;
			}
		});
		this.monthList = this.global.monthList;
    this.getData()
	}

async  getData(){
  await this.global.showLoading()
    this.global.httpPost('businessEmployee/loan/detail',{id:this.id}).subscribe(
     async (res:any) => {
      await this.global.dismisLoading()
      console.log(res);
      this.loanForm.get('amount').setValue(res.amount)
      this.loanForm.get('date').setValue(res.date)
      // this.loanForm.get('details').setValue(res.details)
      res.details.map((item:any)=>{
        console.log(item);
       
        this.loanDetails.push(this.loanDetails.length + 1);
        this.details.push( this.newDetails(item.year,item.month,item.installment_amount));
      })
       
     },
     async (error:any) => {
      await this.global.dismisLoading()

     },
    )
  }
  
	setTitle() {
		this.seo.generateTags({
			title: 'افزودن وام جدید',
			description: 'وام جدید ',
			keywords: 'وام جدید',
			isNoIndex: false,
		});
	}

	addAnotherDetails() {
		this.loanDetails.push(this.loanDetails.length + 1);
		this.details.push(this.newDetails());
		// console.log(this.detailsFormGroup);
	}

	removeDetail(index: number) {
		this.global
			.showAlert('حذف قسط', 'آیا برای حذف قسط اطمینان دارید ؟ ', [
				{
					text: 'خیر',
					role: 'cancel',
				},
				{
					text: 'بلی',
					role: 'yes',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						this.loanDetails.splice(index, 1);
						this.details.removeAt(index);
					}
				});
			});
	}

	async onSubmit(AddAnOther: boolean = false) {
		this.loanForm.markAllAsTouched();
		if (this.loanForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('businessEmployee/loan/add', this.loanForm.value)
				.subscribe(
					async (res: any) => {
						console.log(res.employee_id);
						await this.global.dismisLoading();
						// console.log(res:any);
						this.global.showToast(
							'وام جدید با تاریخ ' +
								this.loanForm.value.date +
								' ثبت شد .'
						);
						this.loanForm.reset();
						if (!AddAnOther) {
							this.navCtrl.navigateForward(
								'/employees/detail/' + res.employee_id
							);
						} else {
							location.reload();
						}
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}
}
