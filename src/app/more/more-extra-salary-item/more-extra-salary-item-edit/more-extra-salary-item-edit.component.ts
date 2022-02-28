import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-more-extra-salary-item-edit',
	templateUrl: './more-extra-salary-item-edit.component.html',
	styleUrls: ['./more-extra-salary-item-edit.component.scss'],
})
export class MoreExtraSalaryItemEditComponent implements OnInit {

	pageTitle: string = "افزودن موارد اضاف حقوق";
	editForm: FormGroup;
	dataList: contractExtraField;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {
		this.editForm = this.fb.group({
			id : [],
			name: ['', Validators.compose([Validators.required])],
			add_to_bonus: [false],
		});
	}

	ngOnInit() {
		this.setTitle()
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
		this.global.httpPost('salaryBaseInfo/contractExtraFieldDetail', {
			id: id,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new contractExtraField().deserialize(res);

			this.editForm = this.fb.group({
				id: [this.dataList.id],
				name: [this.dataList.name, Validators.compose([Validators.required])],
				add_to_bonus: [this.dataList.add_to_bonus ],
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
			this.global.httpPatch('salaryBaseInfo/contractExtraField', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/extra-salary-item');
					this.global.showToast('اضاف حقوق با نام ' + this.editForm.value.name + ' ویرایش  شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
