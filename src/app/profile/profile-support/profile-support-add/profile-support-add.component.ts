import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-profile-support-add',
	templateUrl: './profile-support-add.component.html',
	styleUrls: ['./profile-support-add.component.scss'],
})
export class ProfileSupportAddComponent implements OnInit {

	pageTitle: string = "ارسال درخواست جدید";
	addForm: FormGroup;

	categoryId: number;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,

	) {

		this.addForm = this.fb.group({
			subject: ['', Validators.compose([Validators.required])],
			content: ['', Validators.compose([Validators.required])],
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
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('profile/userTicket/add', this.addForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/profile/support');
					this.global.showToast('درخواست جدید با عنوان ' + this.addForm.value.subject + ' ثبت شد .');
					this.addForm.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}


}
