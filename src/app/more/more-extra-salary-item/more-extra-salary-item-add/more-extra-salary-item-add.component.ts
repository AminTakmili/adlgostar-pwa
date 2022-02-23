import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-more-extra-salary-item-add',
	templateUrl: './more-extra-salary-item-add.component.html',
	styleUrls: ['./more-extra-salary-item-add.component.scss'],
})
export class MoreExtraSalaryItemAddComponent implements OnInit {

	pageTitle: string = "افزودن موارد اضاف حقوق";
	addFrom : FormGroup ;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl : NavController
	) {
		this.addFrom = this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			add_to_bonus: [ false ],
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
			this.global.httpPost('salaryBaseInfo/contractExtraField', this.addFrom.value )
			.subscribe(async (res) => {

				await this.global.dismisLoading();
				// console.log(res);
				this.navCtrl.navigateForward('/more/extra-salary-item');
				this.global.showToast('اضاف حقوق با نام '+ this.addFrom.value.name +' ثبت شد .');
				this.addFrom.reset();
			}, async (error) => {
				await this.global.dismisLoading();
				this.global.showError(error);
			});
		}
	}
}
