import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-salary-constants-add',
  templateUrl: './more-salary-constants-add.component.html',
  styleUrls: ['./more-salary-constants-add.component.scss'],
})
export class MoreSalaryConstantsAddComponent implements OnInit {

	pageTitle: string = "افزودن ثابت های حقوق";
	addFrom : FormGroup ;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl : NavController
	) {
		this.addFrom = this.fb.group({
			year: ['', Validators.compose([Validators.required])],
			grocery_allowance: ['', Validators.compose([Validators.required])],
			children_allowance: ['', Validators.compose([Validators.required])],
			housing_allowance: ['', Validators.compose([Validators.required])],
			max_new_year_gift: ['', Validators.compose([Validators.required])],
			max_bonus: ['', Validators.compose([Validators.required])],

		});
	}

	ngOnInit() {
		this.setTitle()
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

		// console.log(this.extraSalary.value);
		// return ;
		if(this.addFrom.valid){
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('salaryBaseInfo/contractConstantField', this.addFrom.value )
			.subscribe(async (res) => {

				await this.global.dismisLoading();
				// console.log(res);
				this.navCtrl.navigateForward('/more/salary-constants');
				this.global.showToast('ثابت های حقوق مربوط به سال '+ this.addFrom.value.year +' ثبت شد .');
				this.addFrom.reset();
			}, async (error) => {
				await this.global.dismisLoading();
				this.global.showError(error);
			});
		}
	}

}
