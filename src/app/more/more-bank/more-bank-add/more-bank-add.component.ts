import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/core/models/post.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-bank-add',
  templateUrl: './more-bank-add.component.html',
  styleUrls: ['./more-bank-add.component.scss'],
})
export class MoreBankAddComponent implements OnInit {

	pageTitle: string = "بانک جدید";
	addFrom: FormGroup;

	categoryId: number;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,

	) {

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
			this.global.httpPost('bank/add', this.addFrom.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/bank');
					this.global.showToast('بانک با نام ' + this.addFrom.value.name + ' ثبت شد .');
					this.addFrom.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}


}
