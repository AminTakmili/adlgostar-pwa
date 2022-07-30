import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DataSets } from './../../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-payroll-tax-edit',
	templateUrl: './payroll-tax-edit.component.html',
	styleUrls: ['./payroll-tax-edit.component.scss'],
})
export class PayrollTaxEditComponent implements OnInit {
	pageTitle: string = 'ویرایش مالیات بر حقوق';
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
			percent: [
				,
				Validators.compose([
					Validators.required,
					Validators.min(0),
					Validators.max(100),
				]),
			],
			from_amount: [
				'',
				Validators.compose([Validators.required, Validators.min(0)]),
			],
			to_amount: [
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
		this.global.httpPost('payrollTax/detail', { id: this.id }).subscribe(
			async (res: any) => {
				await this.global.dismisLoading();
				console.log(res);
				this.editForm.get('year').setValue(res.year);
				this.editForm.get('to_amount').setValue(res.to_amount);
				this.editForm.get('from_amount').setValue(res.from_amount);
				this.editForm.get('percent').setValue(res.percent);
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
				.httpPatch('payrollTax/edit', this.editForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);

						this.navCtrl.navigateForward(
							'/payrolls/payroll_base_info/payroll_tax/list'
						);
						this.global.showToast(
							'مالیت بر حقوق ویرایش شد',
							1000,
							'top',
							'success',
							'ios'
						);

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
