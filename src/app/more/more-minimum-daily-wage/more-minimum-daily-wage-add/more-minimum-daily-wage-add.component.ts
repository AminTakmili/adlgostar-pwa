import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/core/models/post.model';
import { StaticData } from 'src/app/core/models/StaticData.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-more-minimum-daily-wage-add',
	templateUrl: './more-minimum-daily-wage-add.component.html',
	styleUrls: ['./more-minimum-daily-wage-add.component.scss'],
})
export class MoreMinimumDailyWageAddComponent implements OnInit {

	pageTitle: string = "افزودن حداقل دستمزد روزانه";
	addForm: FormGroup;

	categoryId: number;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {

		this.addForm = this.fb.group({
			year: ['', Validators.compose( [Validators.required ] ) ],
			minimum_wage: ['', Validators.compose( [Validators.required ] ) ],
		});

	}

	ngOnInit() {
		this.setTitle();

	}
	ionViewWillEnter() {

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
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('salaryBaseInfo/addMinimumWage', this.addForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/minimum-daily-wage');
					this.global.showToast('افزودن حداقل دستمزد روزانه مربوط به سال ' + this.addForm.value.year + ' ثبت شد .');
					this.addForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
