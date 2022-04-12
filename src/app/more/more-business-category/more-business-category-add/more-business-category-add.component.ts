import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BusinessCategory } from 'src/app/core/models/business.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-more-business-category-add',
  templateUrl: './more-business-category-add.component.html',
  styleUrls: ['./more-business-category-add.component.scss'],
})
export class MoreBusinessCategoryAddComponent implements OnInit {

	pageTitle: string = "افزودن دسته بندی کسب کار جدید";
	addForm: FormGroup;

	businessCatgeories : BusinessCategory[];
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
			parent_id: [this.categoryId],
			name: ['', Validators.compose( [Validators.required ] ) ],
		});

	}

	ngOnInit() {
		this.setTitle();

	}
	ionViewWillEnter() {
		this.getData();
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	getData() {

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
		if(!this.categoryId){
			this.addForm.get('parent_id').setValue(0)
		}else{
			this.addForm.get('parent_id').setValue(this.categoryId);
			console.log(this.categoryId);
		}
	}

	async onSubmit() {
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('businessCategory/add', this.addForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/business-category');
					this.global.showToast('دسته بندی با نام ' + this.addForm.value.name + ' ثبت شد .');
					this.addForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
