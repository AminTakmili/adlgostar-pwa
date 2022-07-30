import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DataSets } from './../../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-payroll-addition-edit',
	templateUrl: './payroll-addition-edit.component.html',
	styleUrls: ['./payroll-addition-edit.component.scss'],
})
export class PayrollAdditionEditComponent implements OnInit {
	pageTitle: string = 'ویرایش اضافه بر حقوق و دستمزد';
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
			name: ['', Validators.compose([Validators.required])],
			taxable: [false],
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
		this.global
			.httpPost('payrollAddition/detail', { id: this.id })
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(res);
					this.editForm.get('name').setValue(res.name);
					this.editForm.get('taxable').setValue(res.taxable);
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
				.httpPatch('payrollAddition/edit', this.editForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);

						this.navCtrl.navigateForward(
							'payrolls/payroll_base_info/payroll_addition/list'
						);
						this.global.showToast(
							'مورد اضافه حقوق و دستمزد ویرایش شد',
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
