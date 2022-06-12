import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { format } from 'date-fns-jalali'
import { BusinessList } from 'src/app/core/models/business.model';
import { Employee } from 'src/app/core/models/employee.model';
import { contractConditions, contractTemplate } from 'src/app/core/models/contractConstant.model';
import * as _ from 'lodash';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { severanceBaseCalculation } from 'src/app/core/models/severanceBaseCalculation.model';
import { Employer } from 'src/app/core/models/employer.model';
import { async } from '@angular/core/testing';

@Component({
	selector: 'app-contract-add',
	templateUrl: './contract-add.component.html',
	styleUrls: ['./contract-add.component.scss'],
})
export class ContractAddComponent implements OnInit {

	@ViewChildren('validation') validation: QueryList<any>;
	pageTitle: string = "افزودن قرار داد";
	contractsForm: FormGroup;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;
	step: number = 1;
	// public Editor = ClassicEditor;

	editors = ['Classic', 'Inline'];

	@ViewChild("popoverDatetime2", { static: true }) datetime: IonDatetime;

	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D'
	}
	submitet: boolean = false;
	businessList: BusinessList[] = [];
	employeeList: Employee[] = [];
	employerList: Employer[] = [];
	contractTemplatelist: contractTemplate[];
	contractConditionlist: contractConditions[] = [];
	contractExtraFieldList: contractExtraField[];
	severanceBaseCalculationList: severanceBaseCalculation[];

	provisosList: FormArray;
	extraFieldsList: FormArray;
	childrenAllowancesList: FormArray;

	businessEmpId : number[] = [];

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {



		this.contractsForm = this.fb.group({
			title: ['', Validators.compose([Validators.required])],
			business_id: ['', Validators.compose([Validators.required])],
			contract_condition_id: [''],
			employee_ids: [[], Validators.compose([Validators.required])],
			employer_ids: [[], Validators.compose([Validators.required])],
			business_employee_ids: [[], Validators.compose([Validators.required])],
			contract_template_id: ['', Validators.compose([Validators.required])],
			main_text: ['', Validators.compose([Validators.required])],
			end_text: [''],
			// employee_start_date: ['', Validators.compose([Validators.required])],
			start_date: ['', Validators.compose([Validators.required])],
			end_date: ['', Validators.compose([Validators.required])],
			contract_year: ['', Validators.compose([Validators.required])],
			wage: [0, Validators.compose([Validators.required])],
			severance_pay: [0, Validators.compose([Validators.required])],
			grocery_allowance: [0, Validators.compose([Validators.required])],
			housing_allowance: [0, Validators.compose([Validators.required])],
			new_year_gift: [0, Validators.compose([Validators.required])],
			bonus: [0, Validators.compose([Validators.required])],
			food_cost: [0, Validators.compose([Validators.required])],
			pension_cost: [0, Validators.compose([Validators.required])],
			calc_severance_base: [true],
			calc_severance_pay_monthly: [true],
			calc_bonus_monthly: [true],
			calc_new_year_gift_monthly: [true],
			is_contract_for_future: [false],
			is_hourly_contract: [false],
			is_manual: [false],

			children_allowances: this.fb.array([]),
			provisos: this.fb.array([]),
			extra_fields: this.fb.array([]),

		});

		this.provisosList = this.contractsForm.get('provisos') as FormArray;
		this.extraFieldsList = this.contractsForm.get('extra_fields') as FormArray;
		this.childrenAllowancesList = this.contractsForm.get('children_allowances') as FormArray;


	}

	ngOnInit() {
		this.setTitle();
		this.ckeConfig = {
			allowedContent: true,
			extraPlugins: 'divarea',
			forcePasteAsPlainText: true,
			removePlugins: 'exportpdf',
			language: "fa",
			font_defaultLabel: 'IRANSans'
		};
	}

	ionViewWillEnter() {
		this.getData();
	}

	setTitle() {
		this.seo.generateTags({
			title: 'افزودن قرار داد جدید',
			description: 'قرار داد جدی ',
			keywords: "قرار داد جدی",
			isNoIndex: false,
		});
	}

	/* ============================== All form arrays ===========================================*/

	provisos(id: number, text = ''): FormGroup {
		return this.fb.group({
			contract_proviso_template_id: [id, Validators.compose([Validators.required])],
			proviso_text: [text, Validators.compose([Validators.required])],
		});
	}
	get provisosFormGroup(): FormArray {
		return this.contractsForm.get('provisos') as FormArray;
	}

	extraFields(id: number): FormGroup {
		return this.fb.group({
			contract_extra_field_id: [id, Validators.compose([Validators.required])],
			price: [0, Validators.compose([Validators.required])],
		});
	}

	get extraFieldsFormGroup(): FormArray {
		return this.contractsForm.get('extra_fields') as FormArray;
	}

	childrenAllowance(business_employee_id: number , employee_id : number): FormGroup {
		return this.fb.group({
			business_employee_id: [business_employee_id, Validators.compose([Validators.required])],
			employee_id: [employee_id, Validators.compose([Validators.required])],
			children_allowance: [0, Validators.compose([Validators.required])],
		});
	}

	get childrenAllowanceFormGroup(): FormArray {
		return this.contractsForm.get('children_allowances') as FormArray;
	}

	/* ============================== end All form arrays ===========================================*/

	addCondition() {

		// console.log(this.contractsForm.value.contract_condition_id)
		if (this.contractsForm.value.contract_condition_id.length) {
			this.contractsForm.value.contract_condition_id.map((item: number) => {
				const condition = _.find(this.contractConditionlist, { id: item });
				const index = _.findIndex(this.provisosFormGroup.controls, (element: any) => {
					return element.value.contract_proviso_template_id == item;
				}, -1);

				if (index === -1) {
					this.provisosList.push(this.provisos(condition.id, condition.template));
				}
				// }
			});
		}

	}

	RemoveCondition(event: any) {
		this.provisosFormGroup.controls.splice(event.index, 1);
	}
	getData() {
		// const countries = this.global.httpGet('more/countries');

		const business = this.global.httpPost('business/filteredList',{ limit: 2000, offset: 0 });

		const contractTheme = this.global.httpPost('contractTemplate/list',{ limit: 2000, offset: 0 });

		const contractCondition = this.global.httpPost('contractProvisoTemplate/list',{ limit: 2000, offset: 0 });

		const contractExtra = this.global.httpGet('salaryBaseInfo/contractExtraFieldList');

		const severanceBaseCalculation = this.global.httpPost('salaryBaseInfo/severanceBaseCalculationFieldList',{ limit: 1000, offset: 0 });

		this.global.parallelRequest([business, contractTheme, contractCondition, contractExtra, severanceBaseCalculation])
		.subscribe(([businessRes, contractThemeRes = '', contractConditionRes = '', contractExtraRes = '', severanceBaseCRes = '']) => {
			this.CreateBusiness(businessRes);
			this.CreatecontractTheme(contractThemeRes);
			this.CreatecontractCondition(contractConditionRes);
			this.CreatecontractExtra(contractExtraRes);
			this.CountAllYear(severanceBaseCRes);
		});
	}

	async GetEmployee() {

		await this.global.showLoading('لطفا منتظر بمانید...');

		const employerReq = this.global.httpPost('business/detail', {business_id: this.contractsForm.value.business_id});

		const employeeReq = this.global.httpPost('employee/filteredList', {limit: 1000,offset: 0,business_id: this.contractsForm.value.business_id});

		 this.global.parallelRequest([employerReq, employeeReq])
		.subscribe(async ([employer = '', employee = '']) => {
			await this.global.dismisLoading();
			this.employeeLists(employee);
			this.employerLists(employer);
		});

	}

	CreateBusiness(data: any) {
		this.businessList = data.list.map((item: any) => {
			return new BusinessList().deserialize(item);
		});
	}

	CreatecontractTheme(data: any) {
		this.contractTemplatelist = data.list.map((item: any) => {
			return new contractTemplate().deserialize(item);
		});
	}

	CreatecontractCondition(data: any) {
		this.contractConditionlist = data.list.map((item: any) => {
			return new contractConditions().deserialize(item);
		});
	}

	CreatecontractExtra(data: any) {
		this.contractExtraFieldList = data.map((item: any) => {
			this.extraFieldsList.push(this.extraFields(item.id));
			return new contractExtraField().deserialize(item);
		});
		// console.log(this.contractExtraFieldList);
	}

	CountAllYear(data: any) {
		// console.log(data);
		this.severanceBaseCalculationList = data.list.map((item: any) => {
			return new severanceBaseCalculation().deserialize(item);
		});
		this.severanceBaseCalculationList = this.severanceBaseCalculationList.reverse();
	}

	employerLists(data: any){
		 console.log(data);

		if(data.employers.length === 0){
			this.employerList = [];
			this.global.showToast('کسب کار فاقد کارفرما می باشد');

		}else{
			this.employerList = data.employers.map((item: any) => {
				return new Employer().deserialize(item);
			});
		}
	}

	employeeLists(data: any){
		if(data.list.length === 0){
			this.employeeList = [];
			this.global.showToast('کسب کار فاقد کارمند می باشد . ابتدا از قسمت کسب کار به این کسب و کار کارمند اضاف کنید');

		}else{
			this.employeeList = data.list.map((item: any) => {
				return new Employee().deserialize(item);
			});
		}

	}

	/* ==============================================================*/
	/* ==============================================================*/
	/* ==============================================================*/

	returnNameExtraField(id: number) {
		return this.contractExtraFieldList.find(x => x.id === id).name;
	}

	returnchildrenAllowanceName(id: number) {
		const data: Employee = this.employeeList.find(x => x.id === id);
		if (data) {
			return data.first_name + ' ' + data.last_name;
		}
	}

	setContractTheme() {
		const id = this.contractsForm.value.contract_template_id;
		this.contractTemplatelist.map((item) => {
			if (item.id === id) {
				this.contractsForm.get('main_text').setValue(item.template);
			}
		});
		// console.log(this.contractsForm.value.main_text);
	}

	formatDate(value: string) {
		// console.log(this.datetime.dayValues);
		return format(new Date(value), 'yyyy-MM-dd');
	}

	async CalculationField() {

		if (!this.submitet) {

			if (this.contractsForm.value.contract_year === '') {
				this.global.showToast('سال عقد قرار داد را انتخاب کنید')
				return;
			}

			if (!this.contractsForm.get('is_manual').value) {
				this.submitet = true;
				await this.global.showLoading('لطفا منتظر بمانید...');
				this.global.httpPost('contract/calculatePrices', this.contractsForm.value).
					subscribe(async (res: any) => {
						this.submitet = false;
						await this.global.dismisLoading();

						this.contractsForm.get('bonus').setValue(res.bonus);
						this.contractsForm.get('grocery_allowance').setValue(res.grocery_allowance);
						this.contractsForm.get('housing_allowance').setValue(res.housing_allowance);
						this.contractsForm.get('new_year_gift').setValue(res.new_year_gift);
						this.contractsForm.get('severance_pay').setValue(res.severance_pay);
						this.contractsForm.get('wage').setValue(res.wage);

						// console.log(res);

					}, async (error: any) => {
						this.submitet = false;
						await this.global.dismisLoading();
						this.global.showError(error);
					});
			}
		}
	}

	AddAlowences(event: any) {
		const data = this.employeeList.find(x=> x.id === event);
		this.businessEmpId.push(data.business_employee_info[0].id);
		this.childrenAllowancesList.push(this.childrenAllowance(data.business_employee_info[0].id , data.id ));
		this.contractsForm.get('business_employee_ids').setValue(this.businessEmpId);
		// console.log(this.contractsForm.value.business_employee_ids);
		// console.log(this.childrenAllowancesList);
	}

	removeAlowences(event: any) {
		// console.log("removeAlowences",event);
		this.businessEmpId.splice(event.index, 1);
		this.childrenAllowancesList.controls.splice(event.index, 1);
		this.contractsForm.get('business_employee_ids').setValue(this.businessEmpId);
		// console.log(this.contractsForm.value.business_employee_ids);
	}

	calcChildrenAllowance() {
		if (this.contractsForm.value.contract_year !== '' && this.contractsForm.value.business_employee_ids.length) {
			// console.log('calcChildrenAllowance');
			this.global.httpPost('contract/calculateChildrenAllowance', {
				contract_year : this.contractsForm.value.contract_year,
				is_hourly_contract : this.contractsForm.value.is_hourly_contract,
				employee_ids : this.contractsForm.value.employee_ids
			}).subscribe(async (res: any) => {

				this.childrenAllowanceFormGroup.controls.map((item:any)=>{
					const  allowance = res.find((x:any) => x.employee_id === item.value.employee_id).children_allowance ;
					item.get('children_allowance').setValue(allowance);
				});

				}, async (error: any) => {
					this.global.showError(error);
				});
		} else {
			// console.log('no-calcChildrenAllowance')
		}
	}

	async onSubmit() {
		// console.log('submit form');
		this.contractsForm.markAllAsTouched();
		// console.log(this.contractsForm)
		if (this.contractsForm.valid) {
			this.submitet = true;
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('contract/add', this.contractsForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					this.navCtrl.navigateForward('/contracts/list');
					this.global.showToast(' قرار داد با نام  ' + this.contractsForm.value.title + ' ثبت شد .');
					this.contractsForm.reset();

				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
					this.submitet = false;
				});
		} else {

			let errors: string[] = [];
			setTimeout(() => {
				this.validation.forEach((elem: any) => {
					if (elem.text) {
						errors.push('<li class="font-size-14 color-danger">' + elem.text.el.innerText + '</li>');
					}
				});
				this.global.showAlert(
					'خطا',
					'<ul class="px-4 my-0">' + errors.join('') + '</ul>',
					[{
						text: 'متوجه شدم',
						role: 'yes'
					}],
					'ابتدا موارد زیر را بررسی و سپس فرم را ثبت کنید'
				).then((alert: any) => {
					alert.present();
				});
			}, 100);

		}
	}

}
