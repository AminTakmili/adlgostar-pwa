import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Support } from 'src/app/core/models/supoort.model';
import { User } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-profile-support-detail',
  templateUrl: './profile-support-detail.component.html',
  styleUrls: ['./profile-support-detail.component.scss'],
})
export class ProfileSupportDetailComponent implements OnInit {
	@ViewChild(IonModal) modal: IonModal;
	pageTitle : string ;
	dataList : Support = new Support();
	ticketform : FormGroup;
	referredform : FormGroup;
	supportList!:any
	users:User[]

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
		this.referredform = this.fb.group({
			id: [this.route.snapshot.paramMap.get('id'), Validators.compose([Validators.required])],
			section_id: ['', Validators.compose([Validators.required])],
			receiver_id: [],
		});
	}

	ngOnInit() {
		this.setTitle();
		this.getData(this.route.snapshot.paramMap.get('id'));
		this.getEnumList()

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

	async getEnumList(){

	
		this.global.httpGet('more/enumList').subscribe(
			async (res:any) => {
			
				this.supportList=res.sections
			},
			async (error:any) => {
			

				this.global.showError(error)
			},
		)
	}
	setSectionChildern(item:any){
		let id=item.id
		console.log(id);
		this.users=[new User().deserialize( {full_name:`همه کارکنان بخش ${this.supportList?.find((item:any)=>item.id==id)?.name}`})]
	
		this.supportList?.find((item:any)=>item.id==id)?.users.map((item:User)=>{
			this.users.push(new User().deserialize(item))
		})
	
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

    async submitreferredForm(){
		// console.log(this.referredform.value);
		
		this.referredform.markAllAsTouched();
		if (this.referredform.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('profile/userTicket/referredTo', this.referredform.value)
			.subscribe(async (res: any) => {
				
				await this.global.dismisLoading();
				
				this.global.showToast('درخواست شماره ' + this.referredform.value.id + ' ارجاع داده شد .',500,'top','success','ios');
				this.modal.dismiss(this.referredform.value, 'confirm');
					this.referredform.reset();

				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
		
	}
	onWillReferredModalDismiss(e:Event){
		const ev = event as CustomEvent<OverlayEventDetail<string>>;
		if (ev.detail.role === 'confirm') {
			this.dataList=new Support()
			this.getData(this.route.snapshot.paramMap.get('id'));
		
		}

	}

}
