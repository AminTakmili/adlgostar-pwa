import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { format } from 'date-fns-jalali'
import { BusinessList } from 'src/app/core/models/business.model';
import { Employee } from 'src/app/core/models/employee.model';
import { contract, contractConditions, contractTemplate } from 'src/app/core/models/contractConstant.model';
import * as _ from 'lodash';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { severanceBaseCalculation } from 'src/app/core/models/severanceBaseCalculation.model';
import { ActivatedRoute } from '@angular/router';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
@Component({
	selector: 'app-contract-edit',
	templateUrl: './contract-edit.component.html',
	styleUrls: ['./contract-edit.component.scss'],
})
export class ContractEditComponent implements OnInit {

	pageTitle: string = " ویرایش قرار داد ";
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

	dataList: contract;
	provisosList: FormArray;
	extraFieldsList: FormArray;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {
		this.dateValue = format(new Date(), 'yyyy-MM-dd');
		console.log(this.dateValue);
		this.contractsForm = this.fb.group({
			id: ['', Validators.compose([Validators.required])],
			is_group_editing: [1],
			title: ['', Validators.compose([Validators.required])],
			business_id: ['', Validators.compose([Validators.required])],
			contract_condition_id: [''],
			business_employee_ids: [[], Validators.compose([Validators.required])],
			contract_template_id: ['', Validators.compose([Validators.required])],
			main_text: ['', Validators.compose([Validators.required])],
			end_text: [''],
			employee_start_date: [, Validators.compose([Validators.required])],
			start_date: [, Validators.compose([Validators.required])],
			end_date: [, Validators.compose([Validators.required])],
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
		return this.contractsForm.get('provisos') as FormArray;
	}

	extraFields(id: number): FormGroup {
		return this.fb.group({
			contract_extra_field_id: [id, Validators.compose([Validators.required])],
			price: [0, Validators.compose([Validators.required])],
		})
	}

	get extraFieldsFormGroup(): FormArray {
		return this.contractsForm.get('extra_fields') as FormArray;
	}


	addCondition() {


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

		this.getContract(this.route.snapshot.paramMap.get('id'));
	}

	setTitle() {
		this.seo.generateTags({
			title: 'ویرایش قرار داد جدید',
			description: 'قرار داد جدی ',
			keywords: "قرار داد جدی",
			isNoIndex: false,
		});
	}
	async getContract(id: string) {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contract/detail', {
			id: id,
			with_replace: 0,
		}).subscribe(async (res: any) => {
			await this.global.dismisLoading();

			this.dataList = new contract().deserialize(res);
			this.pageTitle = this.dataList.title;
			this.pageTitle = this.dataList.title;

			this.contractsForm.get('id').setValue(this.dataList.id);
			this.contractsForm.get('title').setValue(this.dataList.title);
			this.contractsForm.get('business_id').setValue(this.dataList.business_info.id);
			const contract_proviso_id: number[] = this.dataList.provisos.map((x: any) => {
				return x.contract_proviso_template_id;
			});

			this.contractsForm.get('contract_condition_id').setValue(contract_proviso_id);

			const employees: number[] = this.dataList.employee_info.map((x: any) => {
				return x.business_employee_id;
			});
			console.log(employees);
			this.contractsForm.get('business_employee_ids').setValue(employees);

			this.contractsForm.get('contract_template_id').setValue(this.dataList.contract_template_id);
			this.contractsForm.get('main_text').setValue(this.dataList.main_text);
			this.contractsForm.get('end_text').setValue(this.dataList.end_text);


			this.contractsForm.get('employee_start_date').setValue(this.dataList.employee_start_date);
			this.contractsForm.get('start_date').setValue(this.dataList.start_date);
			this.contractsForm.get('end_date').setValue(this.dataList.end_date);

			this.contractsForm.get('contract_year').setValue(this.dataList.contract_year);
			this.contractsForm.get('wage').setValue(this.dataList.wage ?? 0);
			this.contractsForm.get('severance_pay').setValue(this.dataList.severance_pay ?? 0);
			this.contractsForm.get('grocery_allowance').setValue(this.dataList.grocery_allowance ?? 0);
			this.contractsForm.get('housing_allowance').setValue(this.dataList.housing_allowance ?? 0);
			this.contractsForm.get('children_allowance').setValue(this.dataList.children_allowance ?? 0);
			this.contractsForm.get('new_year_gift').setValue(this.dataList.new_year_gift ?? 0);
			this.contractsForm.get('bonus').setValue(this.dataList.bonus ?? 0);
			this.contractsForm.get('food_cost').setValue(this.dataList.food_cost ?? 0);
			this.contractsForm.get('pension_cost').setValue(this.dataList.pension_cost ?? 0);
			this.contractsForm.get('calc_severance_base').setValue(this.dataList.calc_severance_base ? true : false);
			this.contractsForm.get('calc_severance_pay_monthly').setValue(this.dataList.calc_severance_pay_monthly ? true : false);
			this.contractsForm.get('calc_bonus_monthly').setValue(this.dataList.calc_bonus_monthly ? true : false);
			this.contractsForm.get('calc_new_year_gift_monthly').setValue(this.dataList.calc_new_year_gift_monthly ? true : false);
			this.contractsForm.get('is_contract_for_future').setValue(this.dataList.is_contract_for_future ? true : false);
			this.contractsForm.get('is_hourly_contract').setValue(this.dataList.is_hourly_contract ? true : false);
			this.contractsForm.get('is_manual').setValue(this.dataList.is_manual ? true : false);

			// this.GetEmployee();

			this.setTitle();


			console.log(this.dataList);
			//EMPLOYEE IN CONTACR
			this.employeeList = this.dataList.employee_info.map((item: any) => {
				return new Employee().deserialize(item);
			});
			// SET EXTRA FILED
			this.extraFieldsList.controls.map((item: FormGroup) => {
				const id = item.value.contract_extra_field_id;
				const field = this.dataList.extra_fields.find(x => x.contract_extra_field_id === id);
				item.get('price').setValue(field ? field.price : 0);
			});

			// SET  CONDITION
			this.dataList.provisos.map((item: any) => {
				this.provisosList.push(this.provisos(item.contract_proviso_template_id, item.proviso_text));
			});
			// console.log(res:any);
		}, async (error: any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
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
		// console.log(this.contractsForm.value.main_text);
	}



	async CalculationField() {

		if (!this.submitet) {

			if (this.contractsForm.value.contract_year === '') {
				this.global.showToast('سال عقد قرار داد را انتخاب کنید')
				return;
			}
			if (!this.contractsForm.get('is_manual').value) {

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
	}

	async onSubmit() {
		this.submitet = true;
		if (this.contractsForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('contract/edit', this.contractsForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					this.navCtrl.navigateForward('/contracts/list');
					this.global.showToast(' قرار داد با نام  ' + this.contractsForm.value.title + ' ویرایش شد .');
					this.contractsForm.reset();

				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
					this.submitet = false;
				});
		}
	}

	checkGroupEditing() {
		if (this.contractsForm.value.business_employee_ids.length === this.employeeList.length) {
			this.contractsForm.get('is_group_editing').setValue(1)
		} else {
			this.contractsForm.get('is_group_editing').setValue(0)
		}
		// console.log(this.contractsForm.value.is_group_editing);
	}

}
