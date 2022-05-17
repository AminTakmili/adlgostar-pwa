import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { globalData } from 'src/app/core/data/global.data'
import { citiesClass } from 'src/app/core/classes/cities.class';
import { businessClass } from 'src/app/core/classes/business.class';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from 'src/app/core/services/seo.service';
import { NavController } from '@ionic/angular';
import { error } from 'src/app/core/models/other.models';
import * as _ from 'lodash';

@Component({
	selector: 'app-business-importer',
	templateUrl: './business-importer.component.html',
	styleUrls: ['./business-importer.component.scss'],
})
export class BusinessImporterComponent implements OnInit {

	disable = true;
	employerList: any;
	employer = this.global.user.id;
	businessAddress: any = [1]
	pageTitle: string = "افزودن کسب کار با اکسل";
	addresses: FormArray;
	////////////////////
	personType = globalData.personType;
	province: citiesClass[] = [];
	businessCatgeories: businessClass[] = [];
	addForm: FormGroup;
	errors : error[] = [];

	categoryLimit = 1000;
	categoryoffSet = 0;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private cd: ChangeDetectorRef,
	) {
		this.addForm = this.fb.group({
			file: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {
		this.setTitle();
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
			var formData: any = new FormData();
			formData.append("file", this.addForm.get('file').value);

			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPostFormData('business/import', formData)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/businesses');
					this.addForm.reset();
					this.global.showToast('کسب و کار ها با موفقیت ثبت شدند .');
				}, async (err: any) => {
					await this.global.dismisLoading();
					this.errors = err.error.data.map((item:any)=>{
						return new error().deserialize(item);
					});
					this.errors = _.sortBy(this.errors, ['row']);
					console.log(this.errors);
					this.addForm.reset();
					this.global.showError(err);
				});
		}
	}

	uploadFile(event: any) {
		const file = (event.target as HTMLInputElement).files[0];
		this.addForm.patchValue({
			file: file,
		});
		this.addForm.get('file').updateValueAndValidity();
	}


}
