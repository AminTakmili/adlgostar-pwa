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
	supportList!:any

	categoryId: number;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,

	) {

		this.addForm = this.fb.group({
			receiver_id:[],
			section_id: [, Validators.compose([Validators.required])],
			subject: ['', Validators.compose([Validators.required])],
			content: ['', Validators.compose([Validators.required])],
		});

	}

	ngOnInit() {
		this.setTitle();
	}
	ionViewWillEnter() {

		this.getData()
	}
	async getData(){

		await this.global.showLoading()
		this.global.httpGet('more/enumList').subscribe(
			async (res:any) => {
				await this.global.dismisLoading()
				// console.log(res.sections);
				this.supportList=res.sections
			},
			async (error:any) => {
				await this.global.dismisLoading()

				this.global.showError(error)
			},
		)
	}
	setSectionChildern(id:number){
		return this.supportList?.find((item:any)=>item.id==id)?.users
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
