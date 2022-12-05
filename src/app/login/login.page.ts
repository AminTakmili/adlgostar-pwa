import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { User } from '../core/models/user.model';
import { GlobalService } from '../core/services/global.service';
import { SeoService } from '../core/services/seo.service';
import { StorageService } from '../core/services/storage.service';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { EffectFlip, Pagination, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([EffectFlip, Pagination, Navigation]);

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	@ViewChild('swiperRef', { static: false }) swiper?: SwiperComponent;
	// @ViewChild('passwordinput') passwordInput: IonInput;

	paswordChecker = {
		minLengthFive: false,
		hasCharecter: false,
		hasNumber: false,
		hasEnglishWord: false,
		totalValid: false,
	};
	paswordBarValue: number = 0;
	paswordBarColor: string = 'danger';

	loginForm: FormGroup;
	verifyForm: FormGroup;
	passwordForm: FormGroup;
	forgetPasswordForm: FormGroup;
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
			mobile: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(11),
					Validators.maxLength(11),
				]),
			],
		});

		this.passwordForm = this.fb.group({
			password: [
				'',
				Validators.compose([
					Validators.required,
					Validators.pattern('^[a-zA-Z0-9$@$!%*/?&#^-_. +]+$'),
					Validators.minLength(5),
					
				]),
			],
		});
		this.forgetPasswordForm = this.fb.group({
			mobile: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(11),
					Validators.maxLength(11),
				]),
			],
			newPassword: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
					Validators.pattern('^[a-zA-Z0-9$@$!%*/?&#^-_. +]+$'),
				]),
			],
			confirmPassword: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
					Validators.pattern('^[a-zA-Z0-9$@$!%*/?&#^-_. +]+$'),
				]),
			],
			verifyCode: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(5),
				]),
			],
		});

		this.verifyForm = this.fb.group({
			verifycode: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(5),
				]),
			],
		});
	}

	ngOnInit() {
		// seo
		this.seo.generateTags({
			title: 'ورود کاربران',
			description: 'ورود با شماره همراه ',
			keywords: 'ورود',
			isNoIndex: false,
		});
	}
	saveMobile() {
		this.loginForm.markAllAsTouched();
		if (this.loginForm.valid) {
			// console.log(res:any);
			this.mobile = this.loginForm.value.mobile;
			this.regStatus = 1;
		}
	}

	async confirmLoginPassword() {
		this.passwordForm.markAllAsTouched();
		if (this.passwordForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('user/confirmLoginPassword', {
					mobile: this.mobile,
					password: this.passwordForm.value.mobile,
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();

						this.global.user = new User().deserialize(res);
						this.storage.set('user', this.global.user);
						this.global._user.next(this.global.user);
						this.global.setPermision(
							this.global.user.permissionsList
						);
						this.global.changeLogin(true);
						this.global.showToast(
							'کاربر گرامی , ' +
								this.global.user.first_name +
								' خوش آمدید .'
						);
						this.navCtrl.navigateRoot(['/']);

						await this.global.dismisLoading();

						clearInterval(this.interval);
						this.regStatus = 0;
						this.verifyForm.reset();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}
	async onLogin() {
		this.loginForm.markAllAsTouched();
		if (this.loginForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('user/login', {
					mobile: this.loginForm.value.mobile,
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						this.regStatus = 2;
						clearInterval(this.interval);
						this.countdown();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}

	countdown() {
		let countDownDate: any = new Date();
		countDownDate.setMinutes(countDownDate.getMinutes() + 2);
		countDownDate = countDownDate.getTime();

		this.interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = countDownDate - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(distance % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			if (distance < 0) {
				clearInterval(this.interval);
				this.timer = '00:00';
			} else {
				this.timer = `0${minutes}:${
					seconds < 10 ? '0' + seconds : seconds
				}`;
			}
		}, 1000);
	}

	async onVerify() {
		this.verifyForm.markAllAsTouched();
		if (this.verifyForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('user/confirmLoginCode', {
					mobile: this.mobile,
					verifyCode: this.verifyForm.value.verifycode,
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res.firstName,res.lastName)

						this.global.user = new User().deserialize(res);
						this.storage.set('user', this.global.user);
						this.global._user.next(this.global.user);
						this.global.setPermision(
							this.global.user.permissionsList
						);
						this.global.changeLogin(true);
						this.global.showToast(
							'کاربر گرامی , ' +
								this.global.user.first_name +
								' خوش آمدید .'
						);
						this.navCtrl.navigateRoot(['/']);

						await this.global.dismisLoading();

						clearInterval(this.interval);
						this.regStatus = 0;
						this.verifyForm.reset();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
						this.verifyForm.reset();
					}
				);
		}
	}
	async onVerifyByPassword() {
		this.passwordForm.markAllAsTouched();
		if (this.passwordForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('user/confirmLoginPassword', {
					mobile: this.mobile,
					password: this.passwordForm.value.password,
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res.firstName,res.lastName)

						this.global.user = new User().deserialize(res);
						this.storage.set('user', this.global.user);
						this.global._user.next(this.global.user);
						this.global.setPermision(
							this.global.user.permissionsList
						);
						this.global.changeLogin(true);
						this.global.showToast(
							'کاربر گرامی , ' +
								this.global.user.first_name +
								' خوش آمدید .'
						);
						this.navCtrl.navigateRoot(['/']);

						await this.global.dismisLoading();

						clearInterval(this.interval);
						this.regStatus = 0;
						this.verifyForm.reset();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
						this.verifyForm.reset();
					}
				);
		}
	}

	reSend() {
		this.global.showLoading('در حال ارسال مجدد پیامک');
		this.global
			.httpPost('user/login', {
				mobile: this.mobile,
			})
			.subscribe(
				() => {
					this.global.dismisLoading();
					this.timer = '02:00';
					this.countdown();
				},
				(error: any) => {
					this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	changeNumber() {
		this.regStatus = 0;
		this.loginForm.reset();
		this.verifyForm.reset();
		this.passwordForm.reset();
		clearInterval(this.interval);
	}
	cleareTimmer() {
		clearInterval(this.interval);
	}

	reSendForgetPassword() {
		this.global.showLoading('در حال ارسال مجدد پیامک');
		this.global
			.httpPost('user/forgetPassword', {
				mobile: this.mobile,
			})
			.subscribe(
				() => {
					this.global.dismisLoading();
					this.timer = '02:00';
					this.countdown();
				},
				(error: any) => {
					this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	async forgetPassword() {
		await this.global.showLoading();
		this.global
			.httpPost('user/forgetPassword', { mobile: this.mobile })
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();

					this.timer = '02:00';
					clearInterval(this.interval);
					this.countdown();
					// console.log(this.swiper, this.swiper.swiperRef);
					this.forgetPasswordForm.get('mobile').setValue(this.mobile)

					this.swiper.swiperRef.slideNext();
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}
	backtoPasswordSlide() {
		this.swiper.swiperRef.slidePrev();
	}
	// =================================
	checkPassword(e: any) {
		const totalPattern = /^[a-zA-Z0-9$@$!%*/?&#^-_. +]+$/;
		const charPattern = /^[$@$!%*/?&#^-_. +]+$/;
		const wordPattern = /^[a-zA-Z]+$/;
		const numPattern = /^[0-9]+$/;
		const value = e.detail.value;
		if (!value) {
			this.paswordChecker = {
				minLengthFive: false,
				hasCharecter: false,
				hasNumber: false,
				hasEnglishWord: false,
				totalValid: false,
			};
		}

		if (totalPattern.test(value)) {
			this.paswordChecker = {
				minLengthFive: false,
				hasCharecter: false,
				hasNumber: false,
				hasEnglishWord: false,
				totalValid: false,
			};
			this.paswordChecker.minLengthFive = value.length >= 5;
			value.split('').map((item: any, index: number) => {
				if (numPattern.test(item)) {
					this.paswordChecker.hasNumber = true;
				}
				if (wordPattern.test(item)) {
					this.paswordChecker.hasEnglishWord = true;
				}
				if (charPattern.test(item)) {
					this.paswordChecker.hasCharecter = true;
				}
			});
		} else {
			// console.log(value.split('')[value.split('').length - 1]);
			// console.log(
			// 	wordPattern.test(value.split('')[value.split('').length - 1])
			// );
			if (value) {
				this.global.showToast(
					'لطفا فقط از کارکترهای مجاز و حروف انگلیسی استفاده کنید ',
					800,
					'top',
					'danger',
					'ios'
				);
			}
		}
		this.paswordChecker.totalValid =
			this.paswordChecker.hasCharecter &&
			this.paswordChecker.hasEnglishWord &&
			this.paswordChecker.hasNumber &&
			this.paswordChecker.minLengthFive;
		// console.log('////////////////////////////////////////');
		// console.log(this.paswordChecker);
		this.setPaswordValidtionBarValue(this.paswordChecker);
	}
	setPaswordValidtionBarValue(paswordChecker: any) {
		this.paswordBarValue = 0;

		if (paswordChecker.hasCharecter) {
			this.paswordBarValue += 0.25;
		}
		if (paswordChecker.hasEnglishWord) {
			this.paswordBarValue += 0.25;
		}
		if (paswordChecker.hasNumber) {
			this.paswordBarValue += 0.25;
		}
		if (paswordChecker.minLengthFive) {
			this.paswordBarValue += 0.25;
		}
		this.setPaswordValidtionBarColor();
	}
	setPaswordValidtionBarColor() {
		if (this.paswordBarValue <= 0.25) {
			this.paswordBarColor = 'danger';
		}
		if (this.paswordBarValue <= 0.5 && this.paswordBarValue > 0.25) {
			this.paswordBarColor = 'warning-orang';
		}
		if (this.paswordBarValue <= 0.75 && this.paswordBarValue > 0.5) {
			this.paswordBarColor = 'warning';
		}
		if (this.paswordBarValue <= 1 && this.paswordBarValue > 0.75) {
			this.paswordBarColor = 'success';
		}
	}
	togglePasswordShow(input: IonInput) {
		// console.log(input);
		// console.log(input);
		// console.log(input.type);
		if (input.type == 'password') {
			input.type = 'text';
		} else {
			input.type = 'password';
		}
		// console.log(input);
	}
	async onSubmitForgetPassword(){

		this.forgetPasswordForm.markAllAsTouched()
		// console.log("object",
		// '(this.paswordChecker.totalValid&&this.forgetPasswordForm.value.newPassword==this.forgetPasswordForm.value.confirmPassword&&this.forgetPasswordForm.valid) ,',
		// (this.paswordChecker.totalValid&&this.forgetPasswordForm.value.newPassword==this.forgetPasswordForm.value.confirmPassword&&this.forgetPasswordForm.valid) ,
		// '(this.paswordChecker.totalValid):' ,
		// (this.paswordChecker.totalValid) ,
		// '(this.forgetPasswordForm.valid)' ,
		// (this.forgetPasswordForm.valid) ,
		// '(this.forgetPasswordForm.value.newPassword==this.forgetPasswordForm.value.confirmPassword)',
		// (this.forgetPasswordForm.value.newPassword==this.forgetPasswordForm.value.confirmPassword) ,
		// 'this.forgetPasswordForm.value.newPassword,this.forgetPasswordForm.value.confirmPassword ',
		// this.forgetPasswordForm.value.newPassword,this.forgetPasswordForm.value.confirmPassword ,

			
		// );
		if (this.paswordChecker.totalValid&&this.forgetPasswordForm.value.newPassword==this.forgetPasswordForm.value.confirmPassword&&this.forgetPasswordForm.valid) {
			await this.global.showLoading()
			this.global.httpPost('user/forgetPassword/changePassword',this.forgetPasswordForm.value).subscribe(
				async (res:any) => {
					// console.log(res);
					await this.global.dismisLoading()
					this.global.showToast(
						'رمز عبور با موفقیت تغیر کرد ',
						800,
						'top',
						'success',
						'ios'
					);
					this.backtoPasswordSlide()
					
				},
				async (error:any) => {
					await this.global.dismisLoading()
					this.global.showError(error)
				}
			)
		}
	}
}
