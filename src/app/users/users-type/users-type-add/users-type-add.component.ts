import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BusinessCategory } from 'src/app/core/models/business.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-users-type-add',
  templateUrl: './users-type-add.component.html',
  styleUrls: ['./users-type-add.component.scss'],
})
export class UsersTypeAddComponent implements OnInit {

	pageTitle: string = " نوع کاربر جدید ";
	addFrom: FormGroup;

	businessCatgeories : BusinessCategory[];
	categoryId: number;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {
		// if(this.route.snapshot.paramMap.get('id')){
		// 	this.categoryId = parseInt(this.route.snapshot.paramMap.get('id'));
		// }
		this.addFrom = this.fb.group({
			name: ['', Validators.compose( [Validators.required ] ) ],
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
		if (this.addFrom.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('user/userType/add', this.addFrom.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/users/type');
					this.global.showToast('نوع کاربر جدید با نام  ' + this.addFrom.value.name + ' ثبت شد .');
					this.addFrom.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}


}
