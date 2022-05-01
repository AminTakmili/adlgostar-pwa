import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { citiesClass } from 'src/app/core/classes/cities.class';
import { globalData } from 'src/app/core/data/global.data';
import { UserRole } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-users-all-add',
	templateUrl: './users-all-add.component.html',
	styleUrls: ['./users-all-add.component.scss'],
})
export class UsersAllAddComponent implements OnInit {

	pageTitle: string = "کاربر جدید";
	addForm: FormGroup;
	address: FormArray;
	gender: any = globalData.gender;
	province: citiesClass[] = [];
	userrole : UserRole[];

	employerImage: File | null;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private cd: ChangeDetectorRef
	) {
		this.employerImage = null;
		this.addForm = this.fb.group({
			role_id : ['',Validators.compose([Validators.required])],
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			national_code: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
			mobile: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
			email: ['', Validators.compose([ Validators.email])],
			gender: ['', Validators.compose([Validators.required])],
			born_at: ['', Validators.compose([Validators.required])],
			birth_place: ['', Validators.compose([Validators.required])],
			birth_certificate_code: ['', Validators.compose([Validators.required])],
			birth_certificate_issuance_place: ['', Validators.compose([Validators.required])],
			addresses: this.fb.array([this.addresses()]),
			image: ['']
		});

		this.address = this.addForm.get('addresses') as FormArray;
	}
	addresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
			phone: ['', Validators.compose([ Validators.maxLength(11)])],
		})
	}
	get addressFormGroup(): FormArray {
		return this.addForm.get('addresses') as FormArray;
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
		const userRole = this.global.httpPost('user/role/list', {limit : 300 , offset : 0 ,type : "user" });
		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([countries , userRole])
			.subscribe(([countriesData ,userRoleRes = '' ]) => {
				this.province = this.global.createCountry(countriesData);
				this.userrole = this.global.createUserRole(userRoleRes);
				const index = this.userrole.findIndex(x=> x.is_default_employer_role === 1 );
				this.userrole.splice(index,1);

			});
	}


	async onSubmit() {

		this.addForm.markAllAsTouched();
		console.log(this.addForm);
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('user/add', this.addForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/users/list');
					this.global.showToast('کاربر با نام ' + this.addForm.value.first_name + ' ' + this.addForm.value.last_name + ' ثبت شد .');
					this.addForm.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	uploadFile(event: any) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.addForm.patchValue({
					image: reader.result
				});

				this.cd.markForCheck();
			};
		}
	}

}
