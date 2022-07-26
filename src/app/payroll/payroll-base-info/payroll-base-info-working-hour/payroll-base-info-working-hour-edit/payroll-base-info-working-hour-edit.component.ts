import { ActivatedRoute } from '@angular/router';
import { DataSets } from './../../../../core/models/StaticData.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-payroll-base-info-working-hour-edit',
	templateUrl: './payroll-base-info-working-hour-edit.component.html',
	styleUrls: ['./payroll-base-info-working-hour-edit.component.scss'],
})
export class PayrollBaseInfoWorkingHourEditComponent implements OnInit {
	pageTitle: string = 'ویرایش ساعت موظفی';
	editForm: FormGroup;
	yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;
	id: string;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute
	) {
		this.id = route.snapshot.paramMap.get('id');

		this.editForm = this.fb.group({
			id: [this.id],
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
		this.global.httpPost('workingHour/detail', { id: this.id }).subscribe(
			async (res: any) => {
				await this.global.dismisLoading();
				console.log(res);
				this.editForm.get('year').setValue(res.year);
				this.editForm.get('month').setValue(res.month);
				this.editForm.get('count_holiday').setValue(res.count_holiday);
				this.editForm.get('count_friday').setValue(res.count_friday);
			},
			async (error: any) => {
				console.log(error);
				await this.global.dismisLoading();
			}
		);
	}

	async onSubmit() {
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPatch('workingHour/edit', this.editForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						this.navCtrl.navigateForward(
							'/payrolls/payroll_base_info/working_hour/list'
						);
						this.global.showToast('ساعت موظفی ویرابش شد');
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
