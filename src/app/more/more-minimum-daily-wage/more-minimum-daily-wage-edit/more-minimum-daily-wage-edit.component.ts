import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { minimumDailyWage } from 'src/app/core/models/minimumdailywage.model';
import { Post } from 'src/app/core/models/post.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-more-minimum-daily-wage-edit',
	templateUrl: './more-minimum-daily-wage-edit.component.html',
	styleUrls: ['./more-minimum-daily-wage-edit.component.scss'],
})
export class MoreMinimumDailyWageEditComponent implements OnInit {


	pageTitle: string = "ویرایش حداقل دستمزد روزانه";
	editForm: FormGroup;
	dataList: minimumDailyWage;

	categoryId: number;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {

		this.editForm = this.fb.group({
			id: [],
			year: ['', Validators.compose([Validators.required])],
			minimum_wage: ['', Validators.compose([Validators.required])],
		});

	}

	ngOnInit() {
		this.setTitle();

	}
	async ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
	}

	async getData(id: string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('salaryBaseInfo/minimumWageDetail', {
			id: id,
		}).subscribe(async (res: any) => {
			await this.global.dismisLoading();

			this.dataList = new minimumDailyWage().deserialize(res);

			this.editForm.get('id').setValue(this.dataList.id);
			this.editForm.get('year').setValue(this.dataList.year);
			this.editForm.get('minimum_wage').setValue(this.dataList.minimum_wage);


		}, async (error: any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
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
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('salaryBaseInfo/minimumWage', this.editForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/minimum-daily-wage');
					this.global.showToast('افزودن حداقل دستمزد روزانه مربوط به سال ' + this.editForm.value.year + ' ویرایش شد .');
					this.editForm.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
