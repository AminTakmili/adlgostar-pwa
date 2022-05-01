import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Support } from 'src/app/core/models/supoort.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-profile-support-detail',
  templateUrl: './profile-support-detail.component.html',
  styleUrls: ['./profile-support-detail.component.scss'],
})
export class ProfileSupportDetailComponent implements OnInit {

	pageTitle : string ;
	dataList : Support = new Support();
	ticketform : FormGroup;

	constructor(
		public global: GlobalService,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private fb: FormBuilder,
	) {
		this.ticketform = this.fb.group({
			id: [this.route.snapshot.paramMap.get('id'), Validators.compose([Validators.required])],
			content: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {
		this.setTitle();
		this.getData(this.route.snapshot.paramMap.get('id'));

	}

	async getData(id : string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('profile/userTicket/detail', {
			id: id,
		}).subscribe(async (res:any) => {

			console.log(res);
			await this.global.dismisLoading();

			this.dataList = new Support().deserialize(res);

		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}


	setTitle() {
		this.seo.generateTags({
			title: 'جزییات تیکت #'+this.route.snapshot.paramMap.get('id'),
			description:  'جزییات تیکت #'+this.route.snapshot.paramMap.get('id'),
			keywords:  'جزییات تیکت #'+this.route.snapshot.paramMap.get('id'),
			isNoIndex: false,
		});
	}

	returnStatus(text:string){
		let replyText ;
		if(text === "pending"){
			replyText = "در انتظار پاسخ";
		}else if(text === "replied"){
			replyText = "پاسخ داده شده";
		}else if(text === "responded"){
			replyText = "پاسخ کارفرما";
		}else if(text === "closed"){
			replyText = "بسته شده" ;
		}else{
			replyText ="";
		}
		return replyText;
	}

	async onSubmit(){
		//profile/userTicket/reply

		this.ticketform.markAllAsTouched();
		if (this.ticketform.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('profile/userTicket/reply', this.ticketform.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					this.navCtrl.navigateForward('/profile/support');
					this.global.showToast('پاسخ به درخواست شماره  ' + this.ticketform.value.id + ' ثبت شد .');
					this.ticketform.reset();

				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	async closeTicket(){
		this.global.showAlert('پایان دادن به این درخواست', 'آیا برای بستن درخواست اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert : any) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpPost('profile/userTicket/close', {
						id: this.route.snapshot.paramMap.get('id'),
					}).subscribe(async (res:any) => {


						await this.global.dismisLoading();
						this.navCtrl.navigateForward('/profile/support');
						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}

}
