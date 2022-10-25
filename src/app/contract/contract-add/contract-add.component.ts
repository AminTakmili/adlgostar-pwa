import * as _ from 'lodash';

import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, NavController } from '@ionic/angular';
import { Observable, Subject, concat, of, throwError } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	tap,
} from 'rxjs/operators';
import { contractConditions, contractTemplate } from 'src/app/core/models/contractConstant.model';
import { contractFooterTemplate, contractHeaderTemplate } from './../../core/models/contractConstant.model';

import { ActivatedRoute } from '@angular/router';
import { BusinessList } from 'src/app/core/models/business.model';
import { CKEditorComponent } from 'ng2-ckeditor';
import { Employee } from 'src/app/core/models/employee.model';
import { Employer } from 'src/app/core/models/employer.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { async } from '@angular/core/testing';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';
import { format } from 'date-fns-jalali'
import { severanceBaseCalculation } from 'src/app/core/models/severanceBaseCalculation.model';

// import { sentenceTemplate } from './../../core/models/sentence.model';





















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
	contractHeaderTemplatelist: contractHeaderTemplate[];
	contractFooterTemplatelist: contractFooterTemplate[];
	contractConditionlist: contractConditions[] = [];
	contractExtraFieldList: contractExtraField[];
	severanceBaseCalculationList: severanceBaseCalculation[];

	provisosList: FormArray;
	extraFieldsList: FormArray;
	childrenAllowancesList: FormArray;
	contractHeaderTemplateInfoList: FormArray;
	contractFooterTemplateInfoList: FormArray;

	businessEmpId : number[] = [];
	businessId :string;
	

	businesslist$: Observable<BusinessList[]>;
	businessInputLoading = false;
	businessInput$ = new Subject<string>();
	
	minLengthTerm = 3;

	// employeeLimit: number = 1000;
	// employeeOffset: number = 0;
	// employeeTotal: number = 0;
	// employeeEnd: boolean = false;

	// employerLimit: number = 1000;
	// employerOffset: number = 0;
	// employerTotal: number = 0;
	// employerEnd: boolean = false;

	businessEmployeeId:string
	EmployeeId:string[]

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private router: ActivatedRoute,
		
	) {
		this.businessEmployeeId=router.snapshot.paramMap.get('businessEmployeeId')
		// this.EmployeeId=router.snapshot.paramMap.get('EmployeeId')
		this.EmployeeId=router.snapshot.queryParamMap.getAll('EmployeeId')
		this.businessId=router.snapshot.queryParamMap.get('business_id')
		// console.log(
		// router.snapshot.queryParamMap.getAll('emId')	
		// );
		console.log(this.businessId);

// console.log(this.businessEmployeeId);
		this.contractsForm = this.fb.group({
			title: ['', Validators.compose([Validators.required])],
			business_id: [, Validators.compose([Validators.required])],
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
			calc_payroll_tax: [0, Validators.compose([Validators.required])],
			calc_unused_leave_monthly: [0, Validators.compose([Validators.required])],
			calc_without_pay_leave_monthly: [0, Validators.compose([Validators.required])],
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
			removePlugins: 'exportpdf,font',
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
	get contractHeaderTemplateInfoListGroup(): FormArray {
		return this.contractsForm.get('contract_header_template_info') as FormArray;
	}
	get contractFooterTemplateInfoListGroup(): FormArray {
		return this.contractsForm.get('contract_footer_template_info') as FormArray;
	}

	newContractHeaderTemplateInfoList(): FormGroup {
		return this.fb.group({
			contract_header_template_id: [],
			header_text: [],
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

		
	loadBusiness() {
		this.businesslist$ = concat(
			of([]), // default items
			this.businessInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.businessInputLoading = true)),
				switchMap((term) => {
					return this.getbusiness(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.businessInputLoading = false))
					);
				})
			)
		);
	}

	getbusiness(term: string = null): Observable<any> {
		return this.global
			.httpPost('business/filteredList', {
				filtered_name: term,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.pipe(
				map((resp) => {
					if (resp.Error) {
						throwError(resp.Error);
					} else {
						return resp.list.map((item: any) => {
							return new BusinessList().deserialize(item);
						});
					}
				})
			);
	}

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

		// const business = this.global.httpPost('business/filteredList',{ limit: 2000, offset: 0 });
		if (this.businessEmployeeId||this.businessId) {
			this.getBusinessById(this.businessEmployeeId,this.businessId);
		} else {
			this.loadBusiness()
		}
		const contractTheme = this.global.httpPost('contractTemplate/list',{ limit: 2000, offset: 0 });
		const contractHeaderTheme = this.global.httpPost('contractHeaderTemplate/filteredList',{ limit: 2000, offset: 0 ,filtered_name:''});
		const contractFooterTheme = this.global.httpPost('contractFooterTemplate/filteredList',{ limit: 2000, offset: 0,filtered_name:'' });

		const contractCondition = this.global.httpPost('contractProvisoTemplate/list',{ limit: 2000, offset: 0 });

		const contractExtra = this.global.httpGet('salaryBaseInfo/contractExtraFieldList');

		const severanceBaseCalculation = this.global.httpPost('salaryBaseInfo/severanceBaseCalculationFieldList',{ limit: 1000, offset: 0 });

		this.global.parallelRequest([ contractTheme,contractHeaderTheme,contractFooterTheme, contractCondition, contractExtra, severanceBaseCalculation])
		.subscribe(([ contractThemeRes = '',contractHeaderThemeRes='',contractFooterThemeRes='', contractConditionRes = '', contractExtraRes = '', severanceBaseCRes = '']) => {
			// this.CreateBusiness(businessRes);
			this.CreatecontractTheme(contractThemeRes);
			this.CreatecontractHeaderTheme(contractHeaderThemeRes);
			this.CreatecontractFooterTheme(contractFooterThemeRes);
			this.CreatecontractCondition(contractConditionRes);
			this.CreatecontractExtra(contractExtraRes);
			this.CountAllYear(severanceBaseCRes);
		});
	}
	async getBusinessById(filtered_business_employee_id: string = null,filtered_business_id: string = null) {
		await	this.global.showLoading()
			console.log(filtered_business_employee_id);
			this.global
				.httpPost('business/filteredList', {
					filtered_business_employee_id,
					filtered_business_id,
					// for_combo: true,
					limit: 1000,
					offset: 0,
					
				})
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading()
						console.log(of(res.list), res.list[0].id);
						this.businesslist$ = of(res.list.map((item: any) => {
							return new BusinessList().deserialize(item);
						})) ;
					
						this.contractsForm.get('business_id').setValue(res.list[0]?.id);
						this.GetEmployee()
					},
					async (error: any) => {
						await this.global.dismisLoading()
	
						this.global.showError(error)
						console.log(error);
					}
				);
		}


	async GetEmployee() {
		console.log("object");
		if (this.contractsForm.value.business_id) {
			
			await this.global.showLoading('لطفا منتظر بمانید...');
	
			const employerReq = this.global.httpPost('business/detail', {business_id: this.contractsForm.value.business_id});
	
			const employeeReq = this.global.httpPost('employee/filteredList', {limit: 1000,offset: 0,business_id: this.contractsForm.value.business_id});
	
			 this.global.parallelRequest([employerReq, employeeReq])
			.subscribe(async ([employer = '', employee = '']) => {
				await this.global.dismisLoading();
				this.contractsForm.controls.employer_ids.setValue('')
				this.contractsForm.controls.employee_ids.setValue('')
				this.employeeLists(employee);
				this.employerLists(employer);
			});
		}else{
			this.contractsForm.controls.business_id.markAsTouched()
			this.employeeList=[]
			this.employerList=[]
			// this.contractsForm.markAllAsTouched()
			this.businesslist$=of([])
			this.loadBusiness()

		}


	}

	// CreateBusiness(data: any) {
	// 	this.businessList = data.list.map((item: any) => {
	// 		return new BusinessList().deserialize(item);
	// 	});
	// }

	CreatecontractTheme(data: any) {
		this.contractTemplatelist = data.list.map((item: any) => {
			return new contractTemplate().deserialize(item);
		});
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
			if (this.EmployeeId && this.EmployeeId.length) {
				let domy:number[]=[]
				this.EmployeeId.map((id)=>{
					domy.push(Number(id)) 
					this.AddAlowences(Number(id))
				})
				this.contractsForm.get('employee_ids').setValue(domy);
				console.log(domy);
				// this.calcChildrenAllowance()
				
			}
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

	setHeaderContractTheme() {
		
		const id = 	this.contractHeaderTemplateInfoListGroup.value[0].contract_header_template_id;
		this.contractHeaderTemplatelist.map((item) => {
			if (item.id === id) {
				// const text=	item.template+'<br>'+this.contractsForm.get('main_text').value
			
				// this.contractsForm.get('main_text').setValue(text);
				this.contractHeaderTemplateInfoListGroup.controls[0].get('header_text').setValue(item.template);
			}else{
				console.log(id);
				if (!id) {
					
					this.contractHeaderTemplateInfoListGroup.controls[0].get('header_text').setValue('');
				}

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
				if (!id) {
					
					this.contractFooterTemplateInfoListGroup.controls[0].get('footer_text').setValue('');
				}

			}
		});
		// console.log(this.contractsForm.value.main_text);
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
	async manualCalculatePrices() {
console.log('this.manualCalculatePrices');
		if (!this.submitet) {
			if (this.contractsForm.get('is_manual').value) {
			if (this.contractsForm.value.contract_year === '') {
				this.global.showToast('سال عقد قرار داد را انتخاب کنید')
				return;
			}

			else {
				this.submitet = true;
				await this.global.showLoading('لطفا منتظر بمانید...');
				this.global.httpPost('contract/manualCalculatePrices', this.contractsForm.value).
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
	}

	AddAlowences(event: any) {
		console.log(event);
		console.log(this.businessEmpId);
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
		console.log('this.contractsForm.value.business_employee_ids.length',this.contractsForm.value.business_employee_ids.length);
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
