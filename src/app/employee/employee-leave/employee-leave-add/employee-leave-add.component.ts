import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DataSets } from './../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';
import { PickerController } from '@ionic/angular';
@Component({
  selector: 'app-employee-leave-add',
  templateUrl: './employee-leave-add.component.html',
  styleUrls: ['./employee-leave-add.component.scss'],
})
export class EmployeeLeaveAddComponent implements OnInit {
	pageTitle: string = 'افزودن مرخصی';
	addForm: FormGroup;
	yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;

  id:string
  date:any
  hoursOptions:{value:number,text:string}[]=[]
  minutesOptions:{value:number,text:string}[]=[]
//   private selectedAnimal: string;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
    private route: ActivatedRoute,
	private pickerCtrl: PickerController
	) {
    this.id = route.snapshot.paramMap.get('id');

		this.addForm = this.fb.group({
    		  business_employee_id: [this.id],
			year: [, Validators.compose([Validators.required])],
			month: [, Validators.compose([Validators.required])],
			amount: [, Validators.compose([Validators.required])],
		
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
		this.makeOptionsPicker()
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}
	async openPicker() {
		const picker = await this.pickerCtrl.create({
		  columns: [
			{
			  name: 'hours',
			  options:this.hoursOptions
			},
			{
			  name: 'minutes',
			  options: this.minutesOptions
			},
			
		  ],
		  buttons: [
			{
			  text: 'انصراف',
			  role: 'cancel',
			},
			{
			  text: 'تایید',
			  handler: (value) => {
				const val=value.hours.value+':'+value.minutes.value
				console.log(value);
				console.log(val);
				this.addForm.get('amount').setValue(val)
				this.date=value.hours.value+' ساعت و '+value.minutes.value+' دقیقه '
				// window.alert(`You selected a ${value.crust.text} pizza with ${value.meat.text} and ${value.veggies.text}`);
			  },
			},
		  ],
		  htmlAttributes: { dir: 'rtl'},
		  cssClass:'add-leave-picker',
		});
	
		await picker.present();
	  }
	  makeOptionsPicker(){
		for (let i = 0; i <= 200; i++) {
			this.hoursOptions.push({value:i,text:` ${i} ساعت   `})
			
		}
		for (let i = 0; i < 60; i++) {
			this.minutesOptions.push({value:i,text: i+' دقیقه '})
			
		}
		console.log(this.hoursOptions);
		console.log(this.minutesOptions);

	  }

	async onSubmit() {
		console.log(this.addForm.value);
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('businessEmployee/leave/add', this.addForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						this.navCtrl.navigateForward(
							'/employees/detail/'+res.employee_id
						);
						this.global.showToast(' مرخصی جدید ثبت شد');
						this.addForm.reset();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}

}
