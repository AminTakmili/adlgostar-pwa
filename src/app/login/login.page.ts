import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from '../core/models/user.model';
import { GlobalService } from '../core/services/global.service';
import { SeoService } from '../core/services/seo.service';
import { StorageService } from '../core/services/storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
			title:   'ورود کاربران',
			description: 'ورود با شماره همراه ',
			keywords: "ورود",
			isNoIndex: false,
		});
	}
	async onLogin() {
		if (this.loginForm.valid) {

			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('user/login', {
				mobile: this.loginForm.controls['mobile'].value,
			}).subscribe(async (res:any) => {


				// console.log(res:any);
				this.mobile = this.loginForm.controls['mobile'].value;
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
				mobile: this.mobile,
				verifyCode: this.verifyForm.controls['verifycode'].value,
			}).subscribe(async (res : any) => {
				await this.global.dismisLoading();
				// console.log(res.firstName,res.lastName)


					this.global.user = new User().deserialize(res);
					this.storage.set('user',this.global.user);
					this.global.setPermision(this.global.user.permissionsList);
					this.global.changeLogin(true);
					this.global.showToast('کاربر گرامی , ' + this.global.user.first_name + ' خوش آمدید .');
					this.navCtrl.navigateRoot(['/']);

					await this.global.dismisLoading();

					clearInterval(this.interval);
					this.regStatus = 0;
					this.verifyForm.reset();


			}, async (error:any) => {
				await this.global.dismisLoading();
				this.global.showError(error);
				this.verifyForm.reset();
			});
		}
	}

	reSend() {
		this.global.showLoading('در حال ارسال مجدد پیامک');
		this.global.httpPost('user/login', {
			mobile: this.mobile
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

}
