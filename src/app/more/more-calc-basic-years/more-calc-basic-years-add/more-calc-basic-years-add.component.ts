import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-more-calc-basic-years-add',
	templateUrl: './more-calc-basic-years-add.component.html',
	styleUrls: ['./more-calc-basic-years-add.component.scss'],
})
export class MoreCalcBasicYearsAddComponent implements OnInit {


	pageTitle: string = "ثبت محاسبه پایه سنوات جدید";
	addFrom: FormGroup;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,

	) {
		this.addFrom = this.fb.group({
			contract_year: ['', Validators.compose([Validators.required , Validators.pattern("^[0-9]*$"), , Validators.minLength(4), Validators.maxLength(4)])],
			incremental_percent: ['', Validators.compose([Validators.required , Validators.minLength(1), Validators.maxLength(2)])],
			incremental_price: ['', Validators.compose([Validators.required])],
			base_price: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {
		this.setTitle();
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
		if (this.addFrom.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('salaryBaseInfo/severanceBaseCalculationField', this.addFrom.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/calc-basic-years');
					this.global.showToast('محاسبه پایه سنوات مربوط به سال ' + this.addFrom.value.contract_year + ' ثبت شد .');
					this.addFrom.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
