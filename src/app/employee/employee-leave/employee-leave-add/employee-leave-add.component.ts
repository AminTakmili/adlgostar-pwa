import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DataSets } from './../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';

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
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
    private route: ActivatedRoute

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
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	async onSubmit() {
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
							'/employees'
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
