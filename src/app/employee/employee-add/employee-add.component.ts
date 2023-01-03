import { ActivatedRoute, Router } from '@angular/router';
import { asNativeElements, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { IonDatetime } from '@ionic/angular';
// import { format, parseISO } from 'date-fns';

import { citiesClass } from 'src/app/core/classes/cities.class';
import { StaticData } from 'src/app/core/models/StaticData.model';
import { Bank } from 'src/app/core/models/bank.model';
import { EmployeePrevComponent } from '../employee-prev/employee-prev.component';

@Component({
	selector: 'app-employee-add',
	templateUrl: './employee-add.component.html',
	styleUrls: ['./employee-add.component.scss'],

})
export class EmployeeAddComponent implements OnInit {

	@ViewChildren( 'validation' ) validation : QueryList<any>;

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
	businessId!:string

	bankList:Bank[];
	@ViewChild("popoverDatetime2") datetime: IonDatetime;

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
		public modalController: ModalController,
		public route: ActivatedRoute,
		 private router: Router,



	) {

		// this.datetime.dayValues.toLocaleString()
		// this.dateValue = format(new Date(), 'yyyy-MM-dd');
		this.businessId=route.snapshot.paramMap.get('businessId')
		console.log(this.businessId);
		this.employeeForm =  this.fb.group({
			first_name: [ '' , Validators.compose([Validators.required])],
			last_name: [ '', Validators.compose([Validators.required])],
			father_name: [ '', Validators.compose([Validators.required])],
			national_code: [ '' , Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
			mobile: [ '' , Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])],
			gender: [ '' , Validators.compose([Validators.required])],
			marital_status: [ '' , Validators.compose([Validators.required])],
			birth_date: [  , Validators.compose([Validators.required])],
			birth_place: [ '' , Validators.compose([Validators.required])],
			birth_certificate_number: ['' , Validators.compose([Validators.required])],
			birth_certificate_issuance_place: ['' , Validators.compose([Validators.required])],
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
			phone: ['' ,Validators.compose([Validators.maxLength(11)])],
		})
	}
	get addressFormGroup(): FormArray {
		return this.employeeForm.get('addresses') as FormArray;
	}

	family_information(): FormGroup {
		return this.fb.group({
			count_student_child: [0],
			count_non_student_child_over_18: [0],
			total_child: [0],
		})
	}

	get familyInformationGroup(): FormArray {
		return this.employeeForm.get('family_information') as FormArray;
	}

	military_information(): FormGroup {
		return this.fb.group({
			military_state: [''],
			military_exempt_reason: ['',Validators.required],
		})
	}

	get militaryInformationGroup(): FormArray {
		return this.employeeForm.get('military_information') as FormArray;
	}

	bank_information(): FormGroup {
		return this.fb.group({
			id: ['',],
			branch_name: [''],
			account_number: ['', ],
			card_number: ['', Validators.compose([Validators.minLength(16),Validators.maxLength(16)])],
			iban_number: ['', Validators.compose([Validators.minLength(24),Validators.maxLength(24)])],

		})
	}

	duplicate2(data:FormGroup|AbstractControl) {
		console.log(data);
		if(data.get('id').value){
			data.get('card_number').setValidators([Validators.required, Validators.minLength(16),Validators.maxLength(16)]);
			// data.get('card_number').setValue('123')
			data.get('card_number').setValue('');
			data.markAllAsTouched();
		}else{
			data.get('card_number').setValidators([Validators.minLength(16),Validators.maxLength(16)]);
			// data.get('card_number').setValue('123')
			data.get('card_number').setValue('');
			data.markAllAsTouched();
		}
	}
	// duplicate(control: AbstractControl) {
	// 		console.log(
	// 		"amin",control.parent
	// 		)
	// 		console.log("changeID",control?.parent?.value?.id);
	// 	if (control.parent && control.parent.value.id) {
			
	// 		control.parent.markAllAsTouched();
	// 		control.parent.get('card_number').setValidators([Validators.required,Validators.minLength(16),Validators.maxLength(16)]);
	// 		return { required: true }; 
	// 	}
			  
	// 	return null; 
	// }
	cardNumberValidation(control: AbstractControl){
		console.log(control);

		if (!control.value.startsWith('1') || !control.value.includes('front')) {
			return { required: true };
		  }
		  return null;
	}

	get bankInformationGroup(): FormArray {
		return this.employeeForm.get('bank_information') as FormArray;
	}

	image(): FormGroup {
		return this.fb.group({
			birth_certificate_image: [''],
			national_card_image: [''],
			military_card_image: [''],
			employee_image: [''],


		})
	}

	get imageGroup(): FormArray {
		return this.employeeForm.get('image') as FormArray;
	}

	// ------------------------------=======================-------------------------
	// ------------------------------=======================-------------------------
	// ------------------------------=======================-------------------------
	// ------------------------------=======================-------------------------
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
		const bank = this.global.httpPost('bank/list',{limit:200,offset:0});
		// const businessCategory = this.global.httpPost('business-category/list',{limit : this.categoryLimit, offset : this.categoryoffSet });
		this.global.parallelRequest([countries,bank])
			.subscribe(([countriesData, bankData = '' ]) => {

				this.province = this.global.createCountry(countriesData);
				this.bankList = this.global.createBank(bankData);
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

	async onSubmit(AddAnOther : boolean = false) {


		console.log(this.businessId,AddAnOther);
		this.employeeForm.markAllAsTouched();
		if(this.employeeForm.valid){
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('employee/add', this.employeeForm.value)
				.subscribe(async (res: any) => {

					console.log(res);
					await this.global.dismisLoading();
					// console.log(res:any);
					this.global.showToast('کارمند با نام ' + this.employeeForm.value.first_name + ' ' + this.employeeForm.value.last_name + ' ثبت شد .');
				
					if(!AddAnOther){
						if (this.businessId) {
							this.router.navigate([`/businesses/add-employee/${this.businessId}`], { queryParams: {id:res.id} });
						}else{

							this.navCtrl.navigateForward('/employees');
						}
					}else{
						if (this.businessId) {
							this.navCtrl.navigateForward('/employees/add');

						}else{

							location.reload();
						}
					}
					this.employeeForm.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}else{

			let errors : string[] = [];
			setTimeout(() => {
				this.validation.forEach((elem : any)=>{
					if(elem.text){
						errors.push('<li class="font-size-14 color-danger">'+elem.text.el.innerText+'</li>');
					}
				});

				this.global.showAlert(
					'خطا',
					'<ul class="px-4 my-0">'+errors.join('')+'</ul>' ,
					[{
						text: 'متوجه شدم',
						role: 'yes'
					}],
					'ابتدا موارد زیر را بررسی و سپس فرم را ثبت کنید'

					).then((alert : any) => {
					alert.present();

				});

			}, 100);
		}
	}

	checkItem(data:FormGroup|AbstractControl){
		console.log(data.value);
		console.log(data.get('military_state'));
		console.log(data.get('military_state').value);
		if (data.get('military_state')?.value=='exempt') {
			data.get('military_exempt_reason').setValidators([Validators.required]);
			// data.get('military_exempt_reason').setValue('123')
			data.get('military_exempt_reason').setValue('');
			data.markAllAsTouched();
		}else{
			data.get('military_exempt_reason').setValidators([]);
			// data.get('military_exempt_reason').setValue('');
			// data.markAllAsTouched();
		}
		
	}

	async showPrew(){

		const modal = await this.modalController.create({
			component: EmployeePrevComponent,
			cssClass: 'my-custom-class',
			componentProps: {
				data: this.employeeForm.value,
				StaticData : this.StaticData,
				province : this.province,
				bank : this.bankList,

			  }
		  });
		  return await modal.present();
	}
}
