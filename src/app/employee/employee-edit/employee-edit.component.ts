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
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/core/models/employee.model';
@Component({
	selector: 'app-employee-edit',
	templateUrl: './employee-edit.component.html',
	styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit {


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
	pageTitle : string = "ویرایش کارمند";

	@ViewChild("popoverDatetime2") datetime: IonDatetime;

	dateValue : string = '';
	dateValue2 = '';

	dataList: Employee;


	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D'
	}

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private cd: ChangeDetectorRef,
		private route: ActivatedRoute,
	) {

		// this.datetime.dayValues.toLocaleString()
		this.dateValue = format(new Date(), 'yyyy-MM-dd');
		this.employeeForm = this.fb.group({
			id: ['', Validators.compose([Validators.required])],
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			father_name: ['', Validators.compose([Validators.required])],
			national_code: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
			mobile: ['', Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])],
			gender: ['', Validators.compose([Validators.required])],
			marital_status: ['', Validators.compose([Validators.required])],
			birth_date: ['', Validators.compose([Validators.required])],
			birth_place: ['', Validators.compose([Validators.required])],
			birth_certificate_number: ['', Validators.compose([Validators.required])],
			birth_certificate_issuance_place: ['', Validators.compose([Validators.required])],
			degree_id: ['', Validators.compose([Validators.required])],
			field_of_study: [''],
			insurance_more_than_720: [false, Validators.compose([Validators.required])],
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
		// this.employeeImage = this.employeeForm.get('bank_information') as FormArray;
	}

	async ngOnInit() {
		this.setTitle();
		this.getExtra();

		await this.global.baseData.subscribe(value => {
			if (value) {
				this.StaticData = value;
				console.log(this.StaticData);
			}
		});
	}

	async ionViewWillEnter() {
		this.getDetail(this.route.snapshot.paramMap.get('id'));
	}

	async getDetail(id: string) {


		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('employee/detail', {
			employee_id: id,
		}).subscribe(async (res: any) => {
			await this.global.dismisLoading();

			this.dataList = new Employee().deserialize(res);
			console.log(this.dataList);

			const address: FormGroup[] = this.dataList.addresses.map((item: any) => {

				const formAddress = this.fb.group({
					city_id: [item.city_id, Validators.compose([Validators.required])],
					address: [item.address, Validators.compose([Validators.required])],
					postal_code: [item.postal_code, Validators.compose([Validators.minLength(10),Validators.maxLength(10)] )],
					phone: [item.phone, Validators.compose([Validators.minLength(11),Validators.maxLength(11)])],
				});
				return formAddress
			});

			const familyInformation: FormGroup[] = [this.fb.group({
				count_child_under_18_years: [this.dataList.familyInformation.count_child_under_18_years],
				count_student_child_over_18_years_old: [this.dataList.familyInformation.count_student_child_over_18_years_old],
				total_child: [this.dataList.familyInformation.total_child],
			})];


			const militaryInformation: FormGroup[] = [this.fb.group({
				military_state: [this.dataList.militaryInformation.military_state, Validators.compose([Validators.required])],
				military_exempt_reason: [this.dataList.militaryInformation.military_exempt_reason,],

			})];

			const bankInformation: FormGroup[] = [
				this.fb.group({
					id: [this.dataList.bankInformation.id],
					name: [this.dataList.bankInformation.name,Validators.compose([Validators.required])],
					branch_name: [this.dataList.bankInformation.branch_name, Validators.compose([Validators.required])],
					account_number: [this.dataList.bankInformation.account_number],
					card_number: [this.dataList.bankInformation.card_number,Validators.compose([Validators.required,Validators.minLength(16),Validators.maxLength(16)])],
					iban_number: [this.dataList.bankInformation.iban_number,Validators.compose([Validators.minLength(24),Validators.maxLength(24)])],
					payment_with_check: [this.dataList.bankInformation.payment_with_check,],

				})
			];

			const image: FormGroup[] = [this.fb.group({
				birth_certificate_image: [],
				national_card_image: [],
				military_card_image: [],
				employee_image: []
			})]

			this.employeeForm = this.fb.group({
				id: [this.dataList.id, Validators.compose([Validators.required])],
				first_name: [this.dataList.first_name , Validators.compose([Validators.required])],
				last_name: [this.dataList.last_name , Validators.compose([Validators.required])],
				father_name: [this.dataList.father_name , Validators.compose([Validators.required])],
				national_code: [this.dataList.national_code , Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
				mobile: [this.dataList.mobile , Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])],
				gender: [this.dataList.gender , Validators.compose([Validators.required])],
				marital_status: [this.dataList.marital_status , Validators.compose([Validators.required])],
				birth_date: [this.dataList.birth_date , Validators.compose([Validators.required])],
				birth_place: [this.dataList.birth_place , Validators.compose([Validators.required])],
				birth_certificate_number: [this.dataList.birth_certificate_number , Validators.compose([Validators.required])],
				birth_certificate_issuance_place: [this.dataList.birth_certificate_issuance_place , Validators.compose([Validators.required])],
				degree_id: [this.dataList.degree_id , Validators.compose([Validators.required])],
				field_of_study: [this.dataList.field_of_study ],
				insurance_more_than_720: [this.dataList.insurance_more_than_720 ? true : false, Validators.compose([Validators.required])],
				addresses: this.fb.array(address),
				family_information: this.fb.array(familyInformation),
				military_information: this.fb.array(militaryInformation),
				bank_information: this.fb.array(bankInformation),
				image: this.fb.array(image),
			});

			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error: any) => {
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

	addresses(): FormGroup {
		return this.fb.group({
			city_id: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			postal_code: ['' ,  Validators.compose([Validators.minLength(10),Validators.maxLength(10)] )],
			phone: ['' ,Validators.compose([Validators.minLength(11),Validators.maxLength(11)])],
		})
	}
	get addressFormGroup(): FormArray {
		return this.employeeForm.get('addresses') as FormArray;
	}

	family_information(): FormGroup {
		return this.fb.group({
			count_child_under_18_years: [0],
			count_student_child_over_18_years_old: [0],
			total_child: [0],
		})
	}

	get familyInformationGroup(): FormArray {
		return this.employeeForm.get('family_information') as FormArray;
	}

	military_information(): FormGroup {
		return this.fb.group({
			military_state: ['', Validators.compose([Validators.required])],
			military_exempt_reason: [''],
		})
	}

	get militaryInformationGroup(): FormArray {
		return this.employeeForm.get('military_information') as FormArray;
	}

	bank_information(): FormGroup {
		return this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			branch_name: ['', Validators.compose([Validators.required])],
			account_number: ['', ],
			card_number: ['', Validators.compose([Validators.required,Validators.minLength(16),Validators.maxLength(16)])],
			iban_number: ['', Validators.compose([Validators.minLength(24),Validators.maxLength(24)])],
			payment_with_check: [false],
		})
	}

	get bankInformationGroup(): FormArray {
		return this.employeeForm.get('bank_information') as FormArray;
	}

	image(): FormGroup {
		return this.fb.group({
			birth_certificate_image: [''],
			national_card_image: [''],
			military_card_image: [''],
			employee_image: ['']

		})
	}

	get imageGroup(): FormArray {
		return this.employeeForm.get('image') as FormArray;
	}

	NextStep(){
		this.step = this.step + 1;
		this.employeeForm.markAllAsTouched();

	}
	PrevStep(){
		this.employeeForm.markAllAsTouched();
		this.step = this.step - 1;
	}

	getExtra() {
		const countries = this.global.httpGet('more/countries');
		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([countries])
			.subscribe(([countriesData]) => {
				this.province = this.global.createCountry(countriesData);
				// this.setBussinessCategory(businessCategory);
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

	employee_image_uploadFile(event: any, index : number) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.imageGroup.controls[index].patchValue({
					employee_image: reader.result
				});
				this.cd.markForCheck();
			};
		}
	}

	async onSubmit() {
		console.log(this.employeeForm);
		this.employeeForm.markAllAsTouched();
		if(this.employeeForm.valid){
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('employee/edit', this.employeeForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/employees');
					this.global.showToast('کارمند با نام ' + this.employeeForm.value.first_name + ' ' + this.employeeForm.value.last_name + ' ویرایش شد .');
					this.employeeForm.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	checkItem(item:any){
		console.log(item.value);
	}
}
