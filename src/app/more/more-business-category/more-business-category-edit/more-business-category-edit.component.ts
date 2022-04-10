import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BusinessCategory } from 'src/app/core/models/business.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-business-category-edit',
  templateUrl: './more-business-category-edit.component.html',
  styleUrls: ['./more-business-category-edit.component.scss'],
})
export class MoreBusinessCategoryEditComponent implements OnInit {

	pageTitle: string = " دسته بندی کسب کار ";
	editForm: FormGroup;

	businessCatgeories : BusinessCategory[];


	dataList : BusinessCategory ;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {

		this.editForm = this.fb.group({
			id : [],
			parent_id: [],
			name: ['', Validators.compose( [Validators.required ] ) ],
		});

	}

	ngOnInit() {
		this.setTitle();

	}
	ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
		this.moreData();
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}
	async getData(id : string){
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('businessCategory/detail', {
			id: id,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new BusinessCategory().deserialize(res);
			this.editForm.get('name').setValue(this.dataList.name);
			this.editForm.get('parent_id').setValue(this.dataList.parent_id);
			this.editForm.get('id').setValue(this.dataList.id);

			 console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	moreData() {

		const businessCategory = this.global.httpPost('businessCategory/list', { limit: 1000, offset: 0 });

		this.global.parallelRequest([ businessCategory])
		.subscribe(([ businessCategory  ]) => {
			this.setBussinessCategory(businessCategory);
		});
	}

	setBussinessCategory(data: any) {
		this.businessCatgeories = data.list.map((category: any) => {
			return new BusinessCategory().deserialize(category);
		});
		const New : BusinessCategory = new BusinessCategory();
		New.id = 0;
		New.name = "دسته بندی والد" ;

		this.businessCatgeories.unshift.apply(this.businessCatgeories, [New]);

	}

	async onSubmit() {
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('businessCategory/edit', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/business-category');
					this.global.showToast('دسته بندی با نام ' + this.editForm.value.name + ' ویرایش شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}


}
