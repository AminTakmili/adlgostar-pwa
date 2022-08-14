import { DataSets } from './../../../../core/models/StaticData.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-payroll-base-info-working-hour-add',
	templateUrl: './payroll-base-info-working-hour-add.component.html',
	styleUrls: ['./payroll-base-info-working-hour-add.component.scss'],
})
export class PayrollBaseInfoWorkingHourAddComponent implements OnInit {
	pageTitle: string = 'افزودن ساعت موظفی';
	addForm: FormGroup;
	yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		this.addForm = this.fb.group({
			year: [, Validators.compose([Validators.required])],
			month: [, Validators.compose([Validators.required])],
			count_friday: [
				'',
				Validators.compose([Validators.required, Validators.min(0)]),
			],
			count_holiday: [
				'',
				Validators.compose([Validators.required, Validators.min(0)]),
			],
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
				.httpPost('workingHour/add', this.addForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						this.navCtrl.navigateForward(
							'/payrolls/payroll_base_info/working_hour/list'
						);
						this.global.showToast('ساعت موظفی جدید ثبت شد');
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
