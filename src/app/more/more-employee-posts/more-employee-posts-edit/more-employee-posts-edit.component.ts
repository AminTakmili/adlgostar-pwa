import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/core/models/post.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-employee-posts-edit',
  templateUrl: './more-employee-posts-edit.component.html',
  styleUrls: ['./more-employee-posts-edit.component.scss'],
})
export class MoreEmployeePostsEditComponent implements OnInit {

	pageTitle: string = "ویرایش پست جدید برای کارمندان";
	editForm: FormGroup;
	dataList: Post;

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
		this.editForm = this.fb.group({
			id: [],
			name: ['', Validators.compose( [Validators.required ] ) ],
		});

	}

	ngOnInit() {
		this.setTitle();

	}
		async ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));

	}

	async getData(id: string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('post/detail', {
			id: id,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new Post().deserialize(res);

			this.editForm = this.fb.group({
				id: [this.dataList.id],
				name: [this.dataList.name, Validators.compose([Validators.required])],
			});

			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
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
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('post/edit', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/employee-posts');
					this.global.showToast('پست با نام ' + this.editForm.value.name + ' ویرایش شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
