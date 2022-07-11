import { contractFooterTemplate, contractHeaderTemplate } from './../../core/models/contractConstant.model';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { Employer } from 'src/app/core/models/employer.model';

@Component({
	selector: 'app-contract-edit',
	templateUrl: './contract-edit.component.html',
	styleUrls: ['./contract-edit.component.scss'],
})
export class ContractEditComponent implements OnInit {

	@ViewChildren( 'validation' ) validation : QueryList<any>;
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
	employerList: Employer [] = [];
	contractTemplatelist: contractTemplate[];
	contractConditionlist: contractConditions[] = [];
	contractExtraFieldList: contractExtraField[];
	severanceBaseCalculationList: severanceBaseCalculation[];
	contractHeaderTemplatelist: contractHeaderTemplate[];
	contractFooterTemplatelist: contractFooterTemplate[];

	dataList: contract;

	provisosList: FormArray;
	extraFieldsList: FormArray;
	childrenAllowancesList: FormArray;

	businessEmpId : number[] = [];
	contractHeaderTemplateInfoList: FormArray;
	contractFooterTemplateInfoList: FormArray;


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
			employee_ids: [[], Validators.compose([Validators.required])],
			employer_ids: [[], Validators.compose([Validators.required])],
			business_employee_ids: [[], Validators.compose([Validators.required])],
			contract_template_id: ['', Validators.compose([Validators.required])],
			main_text: ['', Validators.compose([Validators.required])],
			end_text: [''],
			// employee_start_date: [, Validators.compose([Validators.required])],
			start_date: [, Validators.compose([Validators.required])],
			end_date: [, Validators.compose([Validators.required])],
			contract_year: ['', Validators.compose([Validators.required])],
			wage: [0, Validators.compose([Validators.required])],
			severance_pay: [0, Validators.compose([Validators.required])],
			grocery_allowance: [0, Validators.compose([Validators.required])],
			housing_allowance: [0, Validators.compose([Validators.required])],
			new_year_gift: [0, Validators.compose([Validators.required])],
			bonus: [0, Validators.compose([Validators.required])],
			food_cost: [0, Validators.compose([Validators.required])],
			pension_cost: [0, Validators.compose([Validators.required])],
			calc_payroll_tax: [0, Validators.compose([Validators.required])],
			calc_unused_leave_monthly: [0, Validators.compose([Validators.required])],
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
			contract_header_template_info: this.fb.array([this.newContractHeaderTemplateInfoList()]),
			contract_footer_template_info: this.fb.array([this.newContractFooterTemplateInfoList()]),

		});

		this.provisosList = this.contractsForm.get('provisos') as FormArray;
		this.extraFieldsList = this.contractsForm.get('extra_fields') as FormArray;
		this.childrenAllowancesList = this.contractsForm.get('children_allowances') as FormArray;
		this.contractHeaderTemplateInfoList = this.contractsForm.get('contract_header_template_info') as FormArray;
		this.contractFooterTemplateInfoList = this.contractsForm.get('contract_footer_template_info') as FormArray;



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

	/* ============================== All form arrays ===========================================*/

	get contractHeaderTemplateInfoListGroup(): FormArray {
		return this.contractsForm.get('contract_header_template_info') as FormArray;
	}
	get contractFooterTemplateInfoListGroup(): FormArray {
		return this.contractsForm.get('contract_footer_template_info') as FormArray;
	}

	newContractHeaderTemplateInfoList(id?:number,text?:string): FormGroup {
		return this.fb.group({
			contract_header_template_id: [id?id:''],
			header_text: [text?text:''],
		})
	}
	newContractFooterTemplateInfoList(): FormGroup {
		return this.fb.group({
			contract_footer_template_id: [],
			footer_text: [],
		})
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

	childrenAllowance(business_employee_id: number , employee_id : number , children_allowance : number = 0 ): FormGroup {
		return this.fb.group({
			business_employee_id: [business_employee_id, Validators.compose([Validators.required])],
			employee_id: [employee_id, Validators.compose([Validators.required])],
			children_allowance: [children_allowance, Validators.compose([Validators.required])],
		})
	}

	get childrenAllowanceFormGroup(): FormArray {
		return this.contractsForm.get('children_allowances') as FormArray;
	}

	/* ============================== end All form arrays ===========================================*/

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


	async getContract(id: string) {
		this.submitet = true;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contract/detail', {
			id: id,
			with_replace: 0,
		}).subscribe(async (res: any) => {
			await this.global.dismisLoading();
			
			this.dataList = new contract().deserialize(res);
			// console.log(this.dataList['contract_header_template_info'][0]?.id,this.dataList['contract_footer_template_info'][0]?.id);
			this.pageTitle = this.dataList.title;
			this.pageTitle = this.dataList.title;

			this.contractsForm.get('id').setValue(this.dataList.id);
			this.contractsForm.get('title').setValue(this.dataList.title);
			this.contractsForm.get('business_id').setValue(this.dataList.business_info.id);
			console.log(this.dataList['contract_footer_template_info']);
			// this.newContractHeaderTemplateInfoList(this.dataList['contract_header_template_info'][0]?.id,this.dataList['contract_header_template_info'][0]?.template)
			this.contractHeaderTemplateInfoListGroup.controls[0].get('contract_header_template_id').setValue(this.dataList['contract_header_template_info']?.contract_header_template_id);
			// this.contractHeaderTemplateInfoListGroup.controls[0].get('header_text').setValue(this.dataList['contract_header_template_info']?.header_text);
			this.setHeaderContractTheme()
			this.contractFooterTemplateInfoListGroup.controls[0].get('contract_footer_template_id').setValue(this.dataList['contract_footer_template_info']?.contract_footer_template_id);
			// this.contractFooterTemplateInfoListGroup.controls[0].get('footer_text').setValue(this.dataList['contract_footer_template_info']?.footer_text);
			this.setFooterContractTheme()
			const contract_proviso_id: number[] = this.dataList.provisos.map((x: any) => {
				return x.contract_proviso_template_id;
			});

			this.contractsForm.get('contract_condition_id').setValue(contract_proviso_id);

			const employees: number[] = this.dataList.employee_info.map((x: any) => {return x.business_employee_id;});
			this.contractsForm.get('business_employee_ids').setValue(employees);

			const employers: number[] = this.dataList.employers_info.map((x: any) => {return x.id;});
			this.contractsForm.get('employer_ids').setValue(employers);

			this.contractsForm.get('contract_template_id').setValue(this.dataList.contract_template_id);
			this.contractsForm.get('main_text').setValue(this.dataList.main_text);
			this.contractsForm.get('end_text').setValue(this.dataList.end_text);


			// this.contractsForm.get('employee_start_date').setValue(this.dataList.employee_start_date);
			this.contractsForm.get('start_date').setValue(this.dataList.start_date);
			this.contractsForm.get('end_date').setValue(this.dataList.end_date);

			this.contractsForm.get('contract_year').setValue(this.dataList.contract_year);
			this.contractsForm.get('wage').setValue(this.dataList.wage ?? 0);
			this.contractsForm.get('severance_pay').setValue(this.dataList.severance_pay ?? 0);
			this.contractsForm.get('grocery_allowance').setValue(this.dataList.grocery_allowance ?? 0);
			this.contractsForm.get('housing_allowance').setValue(this.dataList.housing_allowance ?? 0);

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
			this.contractsForm.get('calc_payroll_tax').setValue(this.dataList.calc_payroll_tax ? true : false);
			this.contractsForm.get('calc_unused_leave_monthly').setValue(this.dataList.calc_unused_leave_monthly ? true : false);
			this.dataList.children_allowances.map((item:any)=>{
				this.childrenAllowancesList.push(this.childrenAllowance(item.business_employee_id , item.employee_id , item.children_allowance ));
			});
			console.log(this.childrenAllowancesList);

			const employeeList = this.dataList.employee_info.map((item: any) => {return new Employee().deserialize(item);});
			const employee_id : number[] = employeeList.map((item:any)=>{return item.id;});
			console.log('employee_id',employee_id);
			this.contractsForm.get('employee_ids').setValue(employee_id)
			this.GetEmployee();

			this.setTitle();


			console.log(this.dataList);
			//EMPLOYEE IN CONTACR


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

			setTimeout(() => {
				this.submitet = false;
			}, 1000);

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
		const contractHeaderTheme = this.global.httpPost('contractHeaderTemplate/filteredList',{ limit: 2000, offset: 0 ,filtered_name:''});
		const contractFooterTheme = this.global.httpPost('contractFooterTemplate/filteredList',{ limit: 2000, offset: 0,filtered_name:'' });



		this.global.parallelRequest([business, contractTheme, contractHeaderTheme,contractFooterTheme,contractCondition, contractExtra, severanceBaseCalculation])
			.subscribe(([businessRes, contractThemeRes = '',contractHeaderThemeRes='',contractFooterThemeRes='', contractConditionRes = '', contractExtraRes = '', severanceBaseCRes = '']) => {
				this.CreateBusiness(businessRes);
				this.CreatecontractTheme(contractThemeRes);
				this.CreatecontractHeaderTheme(contractHeaderThemeRes);
				this.CreatecontractFooterTheme(contractFooterThemeRes);
				this.CreatecontractCondition(contractConditionRes);
				this.CreatecontractExtra(contractExtraRes);
				this.CountAllYear(severanceBaseCRes);
			});
	}

	async GetEmployee() {

		const employerReq = this.global.httpPost('business/detail', {business_id: this.contractsForm.value.business_id});

		const employeeReq = this.global.httpPost('employee/filteredList', {limit: 1000,offset: 0,business_id: this.contractsForm.value.business_id});

		 this.global.parallelRequest([employerReq, employeeReq])
		.subscribe(async ([employer = '', employee = '']) => {
			this.employeeLists(employee);
			this.employerLists(employer);
		});

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

	CreatecontractHeaderTheme(data: any) {
		this.contractHeaderTemplatelist = data.list.map((item: any) => {
			return new contractHeaderTemplate().deserialize(item);
		});
	}
	CreatecontractFooterTheme(data: any) {
		this.contractFooterTemplatelist = data.list.map((item: any) => {
			return new contractFooterTemplate().deserialize(item);
		});
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


	employerLists(data: any){
		this.employerList = data.employers.map((item: any) => {
			return new Employer().deserialize(item);
		});
   }

   employeeLists(data: any){
		this.employeeList = data.list.map((item: any) => {
			return new Employee().deserialize(item);
		});
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
						// this.contractsForm.get('children_allowance').setValue(res.children_allowance);
						this.contractsForm.get('grocery_allowance').setValue(res.grocery_allowance);
						this.contractsForm.get('housing_allowance').setValue(res.housing_allowance);
						this.contractsForm.get('new_year_gift').setValue(res.new_year_gift);
						this.contractsForm.get('severance_pay').setValue(res.severance_pay);
						this.contractsForm.get('wage').setValue(res.wage);

						console.log(res);

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
		console.log(this.contractsForm.value.business_employee_ids);
		console.log(this.childrenAllowancesList);
	}

	removeAlowences(event: any) {
		// console.log("removeAlowences",event);
		this.businessEmpId.splice(event.index, 1);
		this.childrenAllowancesList.controls.splice(event.index, 1);
		this.contractsForm.get('business_employee_ids').setValue(this.businessEmpId);
		console.log(this.contractsForm.value.business_employee_ids);
	}

	calcChildrenAllowance() {
		if (this.contractsForm.value.contract_year !== '' && this.contractsForm.value.employee_ids.length) {
			console.log('calcChildrenAllowance');
			this.global.httpPost('contract/calculateChildrenAllowance', {
				contract_year : this.contractsForm.value.contract_year,
				is_hourly_contract : this.contractsForm.value.is_hourly_contract,
				employee_ids : this.contractsForm.value.employee_ids
			}).subscribe(async (res: any) => {

				this.childrenAllowanceFormGroup.controls.map((item:any)=>{
					const  allowance = res.find((x:any) => x.employee_id === item.value.business_employee_id).children_allowance ;
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
		this.contractsForm.markAllAsTouched();
		if (this.contractsForm.valid) {
			this.submitet = true;
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

	checkGroupEditing() {
		if (this.contractsForm.value.business_employee_ids.length === this.employeeList.length) {
			this.contractsForm.get('is_group_editing').setValue(1)
		} else {
			this.contractsForm.get('is_group_editing').setValue(0)
		}
		// console.log(this.contractsForm.value.is_group_editing);
	}
	
	setHeaderContractTheme() {
		
		const id = 	this.contractHeaderTemplateInfoListGroup.value[0].contract_header_template_id;
		this.contractHeaderTemplatelist.map((item) => {
			if (item.id === id) {
				// const text=	item.template+'<br>'+this.contractsForm.get('main_text').value
			
				// this.contractsForm.get('main_text').setValue(text);
				this.contractHeaderTemplateInfoListGroup.controls[0].get('header_text').setValue(item.template);
			}else{
				this.contractHeaderTemplateInfoListGroup.controls[0].get('header_text').setValue('');

			}
		});
		// console.log(this.contractsForm.value.main_text);
	}
	setFooterContractTheme() {
		
		const id = 	this.contractFooterTemplateInfoListGroup.value[0].contract_footer_template_id;
		this.contractFooterTemplatelist.map((item) => {
			if (item.id === id) {
				// const text=	item.template+'<br>'+this.contractsForm.get('main_text').value
			
				// this.contractsForm.get('main_text').setValue(text);
				this.contractFooterTemplateInfoListGroup.controls[0].get('footer_text').setValue(item.template);
			}else{
				this.contractFooterTemplateInfoListGroup.controls[0].get('footer_text').setValue('');

			}
		});
		// console.log(this.contractsForm.value.main_text);
	}

}
