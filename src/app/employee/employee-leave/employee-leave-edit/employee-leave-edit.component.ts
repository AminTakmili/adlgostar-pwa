import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DataSets } from './../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-employee-leave-edit',
  templateUrl: './employee-leave-edit.component.html',
  styleUrls: ['./employee-leave-edit.component.scss'],
})
export class EmployeeLeaveEditComponent implements OnInit {

  pageTitle: string = 'ویرایش  مرخصی';
	editForm: FormGroup;
	yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;
	id: string;
	business_employee_id: string;
  employee_id: string;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute
	) {
		this.id = route.snapshot.paramMap.get('id');
		this.business_employee_id = route.snapshot.paramMap.get('business_employee_id');

		this.editForm = this.fb.group({
      id: [this.id],
      business_employee_id: [this.business_employee_id],
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
		this.getData();
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}
	async getData() {
		await this.global.showLoading();
		this.global.httpPost('businessEmployee/leave/detail', { id: this.id }).subscribe(
			async (res: any) => {
				await this.global.dismisLoading();
				console.log(res);
				this.editForm.get('amount').setValue(res.amount);
				this.editForm.get('month').setValue(res.month);
				this.editForm.get('year').setValue(res.year);
        this.employee_id=res.employee_info.id
			
			},
			async (error: any) => {
				console.log(error);
        this.global.showError(error)
				await this.global.dismisLoading();
			}
		);
	}

	async onSubmit() {
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPatch('businessEmployee/leave/edit', this.editForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						
          	this.navCtrl.navigateForward(
						`/employees/detail/${this.employee_id}`
						);
						this.global.showToast('مرخصی ویرایش شد',1000,'top','success','ios');
	
						this.editForm.reset();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}

}
