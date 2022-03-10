import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { citiesClass } from 'src/app/core/classes/cities.class';
import { globalData } from 'src/app/core/data/global.data';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-employer-add',
	templateUrl: './employer-add.component.html',
	styleUrls: ['./employer-add.component.scss'],
})
export class EmployerAddComponent implements OnInit {

	pageTitle: string = "کارفرما جدید";
	addFrom: FormGroup;
	address: FormArray;
	gender: any = globalData.gender;
	province: citiesClass[] = [];

	employerImage: File | null;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private cd: ChangeDetectorRef
	) {
		this.employerImage = null;
		this.addFrom = this.fb.group({
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			birth_certificate_code: ['', Validators.compose([Validators.required])],
			national_code: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
			mobile: ['', Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])],
			birth_place: ['', Validators.compose([Validators.required])],
			born_at: ['', Validators.compose([Validators.required])],
			birth_certificate_issuance_place: ['', Validators.compose([Validators.required])],
			gender: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			addresses: this.fb.array([this.addresses()]),
			image: ['']
		});

		this.address = this.addFrom.get('addresses') as FormArray;
	}
	addresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10)])],
			phone: ['', Validators.compose([Validators.minLength(11),Validators.maxLength(11)])],
		})
	}
	get addressFormGroup(): FormArray {
		return this.addFrom.get('addresses') as FormArray;
	}

	ngOnInit() {
		this.setTitle();
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
		const countries = this.global.httpGet('more/countries');
		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([countries])
			.subscribe(([countriesData]) => {
				this.province = this.global.createCountry(countriesData);
			});
	}



	async onSubmit() {

		if (this.addFrom.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('employer/add', this.addFrom.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/employers');
					this.global.showToast('کارفرما با نام ' + this.addFrom.value.first_name + ' ' + this.addFrom.value.last_name + ' ثبت شد .');
					this.addFrom.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	uploadFile(event: any ) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.addFrom.patchValue({
					image: reader.result
				});

				this.cd.markForCheck();
			};
		}
	}

}
