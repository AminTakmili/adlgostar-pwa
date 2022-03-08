import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BusinessCategory } from 'src/app/core/models/business.model';
import { UserType } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-users-type-edit',
  templateUrl: './users-type-edit.component.html',
  styleUrls: ['./users-type-edit.component.scss'],
})
export class UsersTypeEditComponent implements OnInit {

	pageTitle: string = "ویرایش نوع کاربر";
	editForm: FormGroup;

	businessCatgeories : BusinessCategory[];
	categoryId: number;
	dataList: UserType = new UserType();

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
		this.editForm = this.fb.group({
			name: ['', Validators.compose( [Validators.required ] ) ],
		});

	}

	ngOnInit() {
		this.setTitle();

	}
	async ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	async getData(id: string) {

		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('user/userType/detail', {
			id: id,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new UserType().deserialize(res);

			this.editForm = this.fb.group({
				id: [this.dataList.id,],
				name: [this.dataList.name, Validators.compose([Validators.required])],

			});

			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}


	async onSubmit() {
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('user/userType/edit', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/users/type');
					this.global.showToast('نوع کابر جدید با نام  ' + this.editForm.value.name + ' ثبت شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}


}
