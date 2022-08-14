import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DataSets } from './../../../../../core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-payroll-settlement-addition-edit',
  templateUrl: './payroll-settlement-addition-edit.component.html',
  styleUrls: ['./payroll-settlement-addition-edit.component.scss'],
})
export class PayrollSettlementAdditionEditComponent implements OnInit {
  pageTitle: string = "ویرایش اضافات تسویه حساب";

	editForm: FormGroup;
	yearsList!: DataSets[];
	
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
		});
	}

	async ngOnInit() {
		this.setTitle();
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.yearsList = value.years;
			}
		});
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
		this.global.httpPost('settlementAddition/detail', { id: this.id }).subscribe(
			async (res: any) => {
				await this.global.dismisLoading();
				console.log(res);
				this.editForm.get('name').setValue(res.name);
			
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
				.httpPatch('settlementAddition/edit', this.editForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						
            this.navCtrl.navigateForward(
							'/payrolls/payroll_base_info/settlement/addition/list'
						);
						this.global.showToast(` ${this.editForm.value.name}  ویرایش شد`,1000,'top','success','ios');
	
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
