import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { severanceBaseCalculation } from 'src/app/core/models/severanceBaseCalculation.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-more-calc-basic-years-edit',
	templateUrl: './more-calc-basic-years-edit.component.html',
	styleUrls: ['./more-calc-basic-years-edit.component.scss'],
})
export class MoreCalcBasicYearsEditComponent implements OnInit {


	dataList: severanceBaseCalculation = new severanceBaseCalculation();

	pageTitle: string = "ویرایش ثبت محاسبه پایه سنوات";
	editForm: FormGroup;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {
		this.editForm = this.fb.group({
			id: [''],
			contract_year: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), , Validators.minLength(4), Validators.maxLength(4)])],
			incremental_percent: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2)])],
			incremental_price: ['', Validators.compose([Validators.required])],
			base_price: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {
		this.setTitle();

	}

	async ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
	}
	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	async getData(id: string) {

		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('salaryBaseInfo/severanceBaseCalculationFieldDetail', {
			id: id,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new severanceBaseCalculation().deserialize(res);

			this.editForm = this.fb.group({
				id: [this.dataList.id,],
				contract_year: [this.dataList.contract_year, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), , Validators.minLength(4), Validators.maxLength(4)])],
				incremental_percent: [parseInt(this.dataList.incremental_percent), Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2)])],
				incremental_price: [this.dataList.incremental_price, Validators.compose([Validators.required])],
				base_price: [this.dataList.base_price, Validators.compose([Validators.required])],
			});

			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	async onSubmit() {
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('salaryBaseInfo/severanceBaseCalculationField', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/calc-basic-years');
					this.global.showToast('محاسبه پایه سنوات مربوط به سال ' + this.editForm.value.contract_year + ' به روز شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}


}
