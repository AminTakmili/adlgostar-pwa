import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
	selector: 'app-contract-add',
	templateUrl: './contract-add.component.html',
	styleUrls: ['./contract-add.component.scss'],
})
export class ContractAddComponent implements OnInit {

	pageTitle: string = "افزودن قرار داد";
	contractsForm: FormGroup;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;
	step: number = 1;
	// public Editor = ClassicEditor;

	editors = ['Classic', 'Inline'];

	@ViewChild("popoverDatetime2", { static: true }) datetime: IonDatetime;

	dateValue: string = '';
	dateValue2 = '';

	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D'
	}
	submitet: boolean = false;
	businessList: BusinessList[] = [];
	employeeList: Employee[] = [];
	contractTemplatelist: contractTemplate[];
	contractConditionlist: contractConditions[] = [];
	contractExtraFieldList: contractExtraField[];
	severanceBaseCalculationList: severanceBaseCalculation[];

	provisosList: FormArray;
	extraFieldsList: FormArray;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		this.dateValue = format(new Date(), 'yyyy-MM-dd');
		console.log(this.dateValue);
		this.contractsForm = this.fb.group({
			title: ['', Validators.compose([Validators.required])],
			business_id: ['', Validators.compose([Validators.required])],
			contract_condition_id: [''],
			business_employee_ids: [[], Validators.compose([Validators.required])],
			contract_template_id: ['', Validators.compose([Validators.required])],
			main_text: ['', Validators.compose([Validators.required])],
			end_text: [''],
			employee_start_date: ['', Validators.compose([Validators.required])],
			start_date: ['', Validators.compose([Validators.required])],
			end_date: ['', Validators.compose([Validators.required])],
			contract_year: ['', Validators.compose([Validators.required])],
			wage: [0, Validators.compose([Validators.required])],
			severance_pay: [0, Validators.compose([Validators.required])],
			grocery_allowance: [0, Validators.compose([Validators.required])],
			housing_allowance: [0, Validators.compose([Validators.required])],
			children_allowance: [0, Validators.compose([Validators.required])],
			new_year_gift: [0, Validators.compose([Validators.required])],
			bonus: [0, Validators.compose([Validators.required])],
			food_cost: [0, Validators.compose([Validators.required])],
			pension_cost: [0, Validators.compose([Validators.required])],
			calc_severance_base: [true, Validators.compose([Validators.required])],
			calc_severance_pay_monthly: [true, Validators.compose([Validators.required])],
			calc_bonus_monthly: [true, Validators.compose([Validators.required])],
			calc_new_year_gift_monthly: [true, Validators.compose([Validators.required])],
			is_contract_for_future: [false, Validators.compose([Validators.required])],
			is_hourly_contract: [false, Validators.compose([Validators.required])],
			is_manual: [false, Validators.compose([Validators.required])],

			provisos: this.fb.array([]),
			extra_fields: this.fb.array([]),

		});

		this.provisosList = this.contractsForm.get('provisos') as FormArray;
		this.extraFieldsList = this.contractsForm.get('extra_fields') as FormArray;


	}

	provisos(id: number, text = ''): FormGroup {
		return this.fb.group({
			contract_proviso_template_id: [id, Validators.compose([Validators.required])],
			proviso_text: [text, Validators.compose([Validators.required])],
		})
	}

	get provisosFormGroup(): FormArray {
		return <FormArray>this.contractsForm.get('provisos');
	}

	extraFields(id: number): FormGroup {
		return this.fb.group({
			contract_extra_field_id: [id, Validators.compose([Validators.required])],
			price: [0, Validators.compose([Validators.required])],
		})
	}

	get extraFieldsFormGroup(): FormArray {
		return <FormArray>this.contractsForm.get('extra_fields');
	}


	addCondition() {

		console.log(this.contractsForm.value.contract_condition_id)
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
			})
		}

	}

	RemoveCondition(event: any) {

		this.provisosFormGroup.controls.splice(event.index, 1);
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

		// console.log(this.datetime.showDefaultTimeLabel)
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

	getData() {
		// const countries = this.global.httpGet('more/countries');
		const business = this.global.httpPost('business/filteredList',
			{ limit: 2000, offset: 0 }
		);

		const contractTheme = this.global.httpPost('contractTemplate/list',
			{ limit: 2000, offset: 0 }
		);

		const contractCondition = this.global.httpPost('contractProvisoTemplate/list',
			{ limit: 2000, offset: 0 }
		);

		const contractExtra = this.global.httpGet('salaryBaseInfo/contractExtraFieldList');

		const severanceBaseCalculation = this.global.httpPost('salaryBaseInfo/severanceBaseCalculationFieldList',
			{ limit: 1000, offset: 0 }
		);

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
		if (this.contractsForm.value.business_id) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('employee/filteredList', {
				limit: 1000,
				offset: 0,
				business_id: this.contractsForm.value.business_id,
			}).subscribe(async (res: any) => {
				await this.global.dismisLoading();
				this.employeeList = res.list.map((item: any) => {
					return new Employee().deserialize(item);
				});
				console.log(this.employeeList);

			}, async (error: any) => {
				await this.global.dismisLoading();
				this.global.showError(error);
			});
		} else {
			this.employeeList = [];
		}

	}

	CreateBusiness(data: any) {
		this.businessList = data.list.map((item: any) => {
			return new BusinessList().deserialize(item);
		});
		// console.log(this.businessList);
	}

	CreatecontractTheme(data: any) {
		this.contractTemplatelist = data.list.map((item: any) => {
			return new contractTemplate().deserialize(item);
		});
		// console.log(this.contractTemplatelist);
	}

	CreatecontractCondition(data: any) {
		this.contractConditionlist = data.list.map((item: any) => {
			return new contractConditions().deserialize(item);
		});
		// console.log(this.contractConditionlist);
	}

	CreatecontractExtra(data: any) {
		this.contractExtraFieldList = data.map((item: any) => {
			this.extraFieldsList.push(this.extraFields(item.id));
			return new contractExtraField().deserialize(item);
		});
		console.log(this.contractExtraFieldList);
	}

	CountAllYear(data: any) {
		console.log(data);
		this.severanceBaseCalculationList = data.list.map((item: any) => {
			return new severanceBaseCalculation().deserialize(item);
		});
		this.severanceBaseCalculationList = this.severanceBaseCalculationList.reverse();
	}

	returnNameExtraField(id: number) {
		return this.contractExtraFieldList.find(x => x.id === id).name;
	}

	setContractTheme() {
		const id = this.contractsForm.value.contract_template_id;
		this.contractTemplatelist.map((item) => {
			if (item.id === id) {
				this.contractsForm.get('main_text').setValue(item.template);
			}
		});
		console.log(this.contractsForm.value.main_text);
	}

	formatDate(value: string) {
		console.log(this.datetime.dayValues);
		return format(new Date(value), 'yyyy-MM-dd');
	}

	async CalculationField() {

		if (!this.submitet) {

			if (this.contractsForm.value.contract_year === '') {
				this.global.showToast('سال عقد قرار داد را انتخاب کنید')
				return;
			}
			if (!this.contractsForm.value.is_manual) {
				console.log(this.contractsForm.value.extra_fields)
				await this.global.showLoading('لطفا منتظر بمانید...');
				this.global.httpPost('contract/calculatePrices', this.contractsForm.value).
					subscribe(async (res: any) => {
						await this.global.dismisLoading();

						this.contractsForm.get('bonus').setValue(res.bonus);
						this.contractsForm.get('children_allowance').setValue(res.children_allowance);
						this.contractsForm.get('grocery_allowance').setValue(res.grocery_allowance);
						this.contractsForm.get('housing_allowance').setValue(res.housing_allowance);
						this.contractsForm.get('new_year_gift').setValue(res.new_year_gift);
						this.contractsForm.get('severance_pay').setValue(res.severance_pay);
						this.contractsForm.get('wage').setValue(res.wage);

						console.log(res);

					}, async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
			}
		}
		// {
		// 	contract_year : this.contractsForm.value.contract_year ,
		// 	start_date : this.contractsForm.value.start_date ,
		// 	end_date : this.contractsForm.value.end_date ,
		// 	employee_start_date :  this.contractsForm.value.employee_start_date ,
		// 	extra_fields : this.contractsForm.value.extra_fields ,
		// 	is_contract_for_future :this.contractsForm.value.is_contract_for_future ,
		// 	is_hourly_contract :this.contractsForm.value.is_hourly_contract ,
		// 	calc_severance_base : this.contractsForm.value.calc_severance_base ,
		// 	calc_severance_pay_monthly : this.contractsForm.value.calc_severance_pay_monthly ,
		// 	calc_bonus_monthly : this.contractsForm.value.calc_bonus_monthly ,
		// 	calc_new_year_gift_monthly : this.contractsForm.value.calc_new_year_gift_monthly ,

		// }
	}

	async onSubmit() {
		this.submitet = true;
		if (this.contractsForm.valid) {
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
		}
	}

}
