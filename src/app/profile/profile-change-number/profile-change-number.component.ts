import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { StorageService } from 'src/app/core/services/storage.service';


@Component({
  selector: 'app-profile-change-number',
  templateUrl: './profile-change-number.component.html',
  styleUrls: ['./profile-change-number.component.scss'],
})
export class ProfileChangeNumberComponent implements OnInit {

	pageTitle :string = 'تغییر شماره همراه';
	loginForm: FormGroup;
	verifyForm: FormGroup;
	mobile: string;
	timer = '02:00';
	private interval: any;
	regStatus = 0;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private navCtrl: NavController,
		private storage: StorageService,
		private seo: SeoService
	) {

		this.loginForm = this.fb.group({
			mobile: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])]
		});

		this.verifyForm = this.fb.group({
			verifycode: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])]
		});
	}

	ngOnInit() {
		// seo
		this.seo.generateTags({
			title:   this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle ,
			isNoIndex: false,
		});
	}
	async onLogin() {
		if (this.loginForm.valid) {

			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('user/changeMobile', {
				newMobile: this.loginForm.value.mobile,
			}).subscribe(async (res:any) => {


				// console.log(res:any);
				this.mobile = this.loginForm.value.mobile;
				await this.global.dismisLoading();
				this.regStatus = 1;
				clearInterval(this.interval);
				this.countdown();

			}, async (error:any) => {
				await this.global.dismisLoading();
				this.global.showError(error);
			});
		}
	}

	countdown(){
		let countDownDate: any = new Date();
		countDownDate.setMinutes(countDownDate.getMinutes() + 2);
		countDownDate = countDownDate.getTime();

		this.interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = countDownDate - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			if (distance < 0) {
				clearInterval(this.interval);
				this.timer = '00:00';
			} else {
				this.timer = `0${minutes}:${(seconds < 10) ? '0' + seconds : seconds}`;
			}
		}, 1000);
	}

	async onVerify() {
		if (this.verifyForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('user/confirmLoginCode', {
				mobile: this.global.user.mobile ,
				verifyCode: this.verifyForm.value.verifycode,
				newMobile: this.mobile,
			}).subscribe(async (res : any) => {
				await this.global.dismisLoading();
				// console.log(res.firstName,res.lastName)


					this.global.user.mobile = this.mobile;
					this.global._user.next(this.global.user) ;
					this.storage.set('user',this.global.user);

					this.global.showToast('کاربر گرامی , ' + this.global.user.first_name + ' شماره همراه شما با موفقیت تغییر پیدا کرد');
					this.navCtrl.navigateRoot('profile/change-number');
					await this.global.dismisLoading();
					clearInterval(this.interval);
					this.regStatus = 0;
					this.verifyForm.reset();
					this.loginForm.reset();

			}, async (error:any) => {
				await this.global.dismisLoading();
				this.global.showError(error);
				this.verifyForm.reset();
			});
		}
	}

	reSend() {
		this.global.showLoading('در حال ارسال مجدد پیامک');
		this.global.httpPost('user/changeMobile', {
			newMobile: this.mobile
		}).subscribe(() => {
			this.global.dismisLoading();
			this.timer = '02:00';
			this.countdown();
		}, (error:any) => {
			this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	changeNumber() {
		this.regStatus = 0;
		this.loginForm.reset();
		this.verifyForm.reset();
		clearInterval(this.interval);
	}

	cleareTimmer(){
		clearInterval(this.interval);
	}


}
