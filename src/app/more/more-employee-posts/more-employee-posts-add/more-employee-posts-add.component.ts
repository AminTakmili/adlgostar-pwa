import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/core/models/post.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-employee-posts-add',
  templateUrl: './more-employee-posts-add.component.html',
  styleUrls: ['./more-employee-posts-add.component.scss'],
})
export class MoreEmployeePostsAddComponent implements OnInit {

	pageTitle: string = "افزودن پست جدید برای کارمندان";
	addForm: FormGroup;

	categoryId: number;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {
		if(this.route.snapshot.paramMap.get('id')){
			this.categoryId = parseInt(this.route.snapshot.paramMap.get('id'));
		}
		this.addForm = this.fb.group({
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
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('post/add', this.addForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/employee-posts');
					this.global.showToast('پست با نام ' + this.addForm.value.name + ' ثبت شد .');
					this.addForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
