import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { contractConstant } from 'src/app/core/models/contractConstant.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-more-salary-constants-edit',
	templateUrl: './more-salary-constants-edit.component.html',
	styleUrls: ['./more-salary-constants-edit.component.scss'],
})
export class MoreSalaryConstantsEditComponent implements OnInit {

	pageTitle: string = "ویرایش ثابت های حقوق";

	editForm: FormGroup;
	dataList: contractConstant;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {
		this.editForm = this.fb.group({
			id: ['', Validators.compose([Validators.required])],
			year: ['', Validators.compose([Validators.required])],
			grocery_allowance: ['', Validators.compose([Validators.required])],
			children_allowance: ['', Validators.compose([Validators.required])],
			housing_allowance: ['', Validators.compose([Validators.required])],
			max_new_year_gift: ['', Validators.compose([Validators.required])],
			max_bonus: ['', Validators.compose([Validators.required])],

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
		this.global.httpPost('salaryBaseInfo/contractConstantFieldDetail', {
			id: id,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new contractConstant().deserialize(res);

			this.editForm = this.fb.group({
				id: [this.dataList.id, Validators.compose([Validators.required])],
				year: [this.dataList.year, Validators.compose([Validators.required])],
				grocery_allowance: [this.dataList.grocery_allowance, Validators.compose([Validators.required])],
				children_allowance: [this.dataList.children_allowance, Validators.compose([Validators.required])],
				housing_allowance: [this.dataList.housing_allowance, Validators.compose([Validators.required])],
				max_new_year_gift: [this.dataList.max_new_year_gift, Validators.compose([Validators.required])],
				max_bonus: [this.dataList.max_bonus, Validators.compose([Validators.required])],
			});

			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	async getConstantMaxValues(){
		await this.global.showLoading('لطفا منتظر بمانید...')
		this.global.httpPost('salaryBaseInfo/getConstantMaxValues',{year:this.editForm.value.year}).subscribe(
			async (res:any) => {
			await	this.global.dismisLoading()
			
				this.editForm.patchValue(res)
			},
			async (error:any) => {
				await	this.global.dismisLoading()
				this.global.showError(error)
				
			},
		)
	}

	async onSubmit() {

		// console.log(this.extraSalary.value);
		// return ;
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('salaryBaseInfo/contractConstantField', this.editForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/more/salary-constants');
					this.global.showToast('ثابت های حقوق مربوط به سال ' + this.editForm.value.year + ' ویرایش شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

}
