import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { IonDatetime } from '@ionic/angular';
// import { format, parseISO } from 'date-fns';
import { compareAsc, format, newDate } from 'date-fns-jalali'
import { citiesClass } from 'src/app/core/classes/cities.class';
import { StaticData } from 'src/app/core/models/StaticData.model';

@Component({
	selector: 'app-employee-add',
	templateUrl: './employee-add.component.html',
	styleUrls: ['./employee-add.component.scss'],

})
export class EmployeeAddComponent implements OnInit {


	step: number = 1;
	employeeForm: FormGroup;
	province: citiesClass[] = [];
	//
	address: FormArray;
	familyInformation: FormArray;
	militaryInformation: FormArray;
	bankInformation: FormArray;
	employeeImage: FormArray;
	StaticData : StaticData;
	pageTitle : string = "افزودن کارمند جدید";

	@ViewChild("popoverDatetime2") datetime: IonDatetime;

	dateValue : string = '';
	dateValue2 = '';


	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D'
	}

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private cd: ChangeDetectorRef

	) {

		// this.datetime.dayValues.toLocaleString()
		this.dateValue = format(new Date(), 'yyyy-MM-dd');
		this.employeeForm = this.fb.group({
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			father_name: ['', Validators.compose([Validators.required])],
			national_code: ['', Validators.compose([Validators.required])],
			mobile: ['', Validators.compose([Validators.required])],
			gender: ['', Validators.compose([Validators.required])],
			marital_status: ['', Validators.compose([Validators.required])],
			birth_date: ['', Validators.compose([Validators.required])],
			birth_place: ['', Validators.compose([Validators.required])],
			birth_certificate_number: ['', Validators.compose([Validators.required])],
			birth_certificate_issuance_place: ['', Validators.compose([Validators.required])],
			degree_id: ['', Validators.compose([Validators.required])],
			field_of_study: ['', Validators.compose([Validators.required])],
			insurance_more_than_720: ['', Validators.compose([Validators.required])],
			addresses: this.fb.array([this.addresses()]),
			family_information: this.fb.array([this.family_information()]),
			military_information: this.fb.array([this.military_information()]),
			bank_information: this.fb.array([this.bank_information()]),
			image : this.fb.array([this.image()]),
		});

		this.address = this.employeeForm.get('addresses') as FormArray;
		this.familyInformation = this.employeeForm.get('family_information') as FormArray;
		this.militaryInformation = this.employeeForm.get('military_information') as FormArray;
		this.bankInformation = this.employeeForm.get('bank_information') as FormArray;
		this.employeeImage = this.employeeForm.get('bank_information') as FormArray;
	}

	async ngOnInit() {
		this.setTitle();
		this.getData();

		await this.global.baseData.subscribe(value => {
			if (value) {
				this.StaticData = value;
			}
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

	addresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			phone: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
		})
	}
	get addressFormGroup(): FormArray {
		return <FormArray>this.employeeForm.get('addresses');
	}

	family_information(): FormGroup {
		return this.fb.group({
			count_child_under_18_years: ['', Validators.compose([Validators.required])],
			count_student_child_over_18_years_old: ['', Validators.compose([Validators.required])],
			total_child: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
		})
	}

	get familyInformationGroup(): FormArray {
		return <FormArray>this.employeeForm.get('family_information');
	}

	military_information(): FormGroup {
		return this.fb.group({
			military_state: ['', Validators.compose([Validators.required])],
			military_exempt_reason: ['', Validators.compose([Validators.required])],
		})
	}

	get militaryInformationGroup(): FormArray {
		return <FormArray>this.employeeForm.get('family_information');
	}

	bank_information(): FormGroup {
		return this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			branch_name: ['', Validators.compose([Validators.required])],
			account_number: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			card_number: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			iban_number: ['', Validators.compose([Validators.pattern("^[0-9]*$")])],
			payment_with_check: [false, Validators.compose([Validators.pattern("^[0-9]*$")])],
		})
	}

	get bankInformationGroup(): FormArray {
		return <FormArray>this.employeeForm.get('bank_information');
	}

	image(): FormGroup {
		return this.fb.group({
			birth_certificate_image: [''],
			national_card_image: [''],
			military_card_image: ['']

		})
	}

	get imageGroup(): FormArray {
		return <FormArray>this.employeeForm.get('image');
	}

	NextStep(){
		this.step = this.step + 1;
	}
	PrevStep(){
		this.step = this.step - 1;
	}

	getData() {
		const countries = this.global.httpGet('more/countries');
		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([countries])
			.subscribe(([countriesData]) => {

				this.setCountry(countriesData);
				// this.setBussinessCategory(businessCategory);
			});
	}

	setCountry(data : any) {
		data[0].provinces.map((province: any) => {
			province.cities.map((city: any) => {
				const cities: citiesClass = new citiesClass();
				cities.id = city.id
				cities.name = city.name;
				cities.provinceId = province.id;
				cities.province = province.name;
				this.province.push(cities);
			});
		});

	}

	birth_certificate_image_uploadFile(event: any, index : number) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.imageGroup.controls[index].patchValue({
					birth_certificate_image: reader.result
				});
				this.cd.markForCheck();
			};
		}
	}
	national_card_image_uploadFile(event: any, index : number) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.imageGroup.controls[index].patchValue({
					national_card_image: reader.result
				});
				this.cd.markForCheck();
			};
		}
	}
	military_card_image_uploadFile(event: any, index : number) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.imageGroup.controls[index].patchValue({
					military_card_image: reader.result
				});
				this.cd.markForCheck();
			};
		}
	}

	async onSubmit() {
		if(this.employeeForm.valid){
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('employee/add', this.employeeForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/employees');
					this.global.showToast('کارمند با نام ' + this.employeeForm.value.first_name + ' ' + this.employeeForm.value.last_name + ' ثبت شد .');
					this.employeeForm.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}
}
