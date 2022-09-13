import { ActivatedRoute } from '@angular/router';
import { SeoService } from './../../../core/services/seo.service';
import { GlobalService } from './../../../core/services/global.service';
import { severanceBaseCalculation } from './../../../core/models/severanceBaseCalculation.model';
import { contractExtraField } from './../../../core/models/contractExtraField.model';
import {
	contract,
	contractConditions,
} from './../../../core/models/contractConstant.model';
import { Employer } from './../../../core/models/employer.model';
import { Employee } from './../../../core/models/employee.model';
import { BusinessList } from './../../../core/models/business.model';
import { IonDatetime, NavController } from '@ionic/angular';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {
	Component,
	OnInit,
	ViewChildren,
	QueryList,
	ViewChild,
} from '@angular/core';
import { format } from 'date-fns-jalali';

@Component({
	selector: 'app-sentence-add',
	templateUrl: './sentence-add.component.html',
	styleUrls: ['./sentence-add.component.scss'],
})
export class SentenceAddComponent implements OnInit {
	@ViewChildren('validation') validation: QueryList<any>;
	pageTitle: string = 'افزودن حکم ';
	sentenceForm: FormGroup;

	step: number = 1;

	editors = ['Classic', 'Inline'];

	@ViewChild('popoverDatetime2', { static: true }) datetime: IonDatetime;

	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D',
	};
	submitet: boolean = false;
	businessList: BusinessList[] = [];
	employeeList: Employee[] = [];
	employerList: Employer[] = [];

	contractConditionlist: contractConditions[] = [];
	// contractExtraFieldList: contractExtraField[];
	severanceBaseCalculationList: severanceBaseCalculation[];



	countChildrenAllowances:FormArray


	businessEmpId: number[] = [];
	id: string;
	dataList: contract;
	businessId: number;
	employerId: number[];
	employeeId: number[];
	isSingel!:boolean
	singelEmployeeId:number
	employeeLoading:boolean=true

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute
	) {
		this.id = this.route.snapshot.paramMap.get('contractId');

		this.isSingel=Boolean( this.route.snapshot.queryParamMap?.get('singel'))
		this.singelEmployeeId=Number(this.route.snapshot.queryParamMap?.get('id')) 
	

		this.sentenceForm = this.fb.group({
			is_group_sentence:[false],
			contract_id:[this.id],
			business_employee_ids: ['', Validators.compose([Validators.required])],
			date: ['', Validators.compose([Validators.required])],
			wage: ['', Validators.compose([Validators.required,Validators.min(0)])],
			trust_allowance: ['', Validators.compose([Validators.required,Validators.min(0)])],
			grocery_allowance: ['', Validators.compose([Validators.required,Validators.min(0)])],
			housing_allowance: ['', Validators.compose([Validators.required,Validators.min(0)])],
			food_cost: ['', Validators.compose([Validators.required,Validators.min(0)])],
			pension_cost: ['', Validators.compose([Validators.required,Validators.min(0)])],
			calc_payroll_tax: [false, Validators.compose([Validators.required])],
			calc_unused_leave_monthly: [false,Validators.compose([Validators.required])],
			calc_without_pay_leave_monthly: [false,Validators.compose([Validators.required])],
			has_monthly_severance_pay: [true,Validators.compose([Validators.required])],
			has_monthly_new_year_gift: [true,Validators.compose([Validators.required])],
			has_monthly_bonus: [true,Validators.compose([Validators.required])],
			count_children_allowances:this.fb.array([]),
			
		});

	
		this.countChildrenAllowances = this.sentenceForm.get('count_children_allowances') as FormArray;

	}

	ngOnInit() {
		this.setTitle();
		// this.ckeConfig = {
		// 	allowedContent: true,
		// 	extraPlugins: 'divarea',
		// 	forcePasteAsPlainText: true,
		// 	removePlugins: 'exportpdf',
		// 	language: "fa",
		// 	font_defaultLabel: 'IRANSans'
		// };
	}

	ionViewWillEnter() {
		this.getData();
		this.getContract(this.id);
	}

	setTitle() {
		this.seo.generateTags({
			title: 'افزودن قرار داد جدید',
			description: 'قرار داد جدی ',
			keywords: 'قرار داد جدی',
			isNoIndex: false,
		});
	}

	/* ============================== All form arrays ===========================================*/

	get CountChildrenAllowancesGroup(): FormArray {
		return this.sentenceForm.get('count_children_allowances') as FormArray;
	}
	newCountChildrenAllowances(business_employee_id:number): FormGroup {
		return this.fb.group({
			business_employee_id: [business_employee_id],
			count_children_allowance: ['',Validators.compose([Validators.required,Validators.min(0)])],
		})
	}


	/* ============================== end All form arrays ===========================================*/

	getData() {
		// const countries = this.global.httpGet('more/countries');

		const business = this.global.httpPost('business/filteredList', {
			limit: 2000,
			offset: 0,
		});

		const contractCondition = this.global.httpPost(
			'contractProvisoTemplate/list',
			{ limit: 2000, offset: 0 }
		);

		// const contractExtra = this.global.httpGet('salaryBaseInfo/contractExtraFieldList');

		// const severanceBaseCalculation = this.global.httpPost('salaryBaseInfo/severanceBaseCalculationFieldList',{ limit: 1000, offset: 0 });
		// const sentenceDetail = this.global.httpPost('contractSentence/detail', {id:this.id});

		this.global
			.parallelRequest([business, contractCondition])
			.subscribe(([businessRes, contractConditionRes = '']) => {
				this.CreateBusiness(businessRes);

				this.CreatecontractCondition(contractConditionRes);
				// this.CreatecontractExtra(contractExtraRes);
				// this.CountAllYear(severanceBaseCRes);
			});
	}
	async getContract(id: string) {
		this.submitet = true;
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('contract/detail', {
				id: id,
				with_replace: 0,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();

					this.dataList = new contract().deserialize(res);
					this.businessId=this.dataList.business_info.id
					if (this.dataList.employers_info.length === 0) {
						this.employerList = [];
						this.global.showToast('کسب کار فاقد کارفرما می باشد');
					} else {
						this.employerList = this.dataList.employers_info.map((item: any) => {
							return new Employer().deserialize(item);
						});
					}
					this.employerId = this.employerList.map((item:any)=>{return item.id;});

					// console.log(this.dataList.children_allowances);
					this.dataList.children_allowances.map((item)=>{
						this.countChildrenAllowances.push(this.newCountChildrenAllowances(item.business_employee_id));
					})
					
				
					const employeeList = this.dataList.employee_info.map((item: any) => {return new Employee().deserialize(item);});
					this.employeeId= employeeList.map((item:any)=>{return item.business_employee_id;});

					if (this.isSingel) {
						if (this.employeeId.includes(this.singelEmployeeId)) {
							this.sentenceForm.get('business_employee_ids').setValue([this.singelEmployeeId])
							
							
						}else{
							
							this.global.showToast('متاسفانه مشکلی پیش امده!',1000,'top','danger','ios')
							this.navCtrl.navigateBack(`contracts/sentence/${this.id}/add`)
						}

					}else{

						this.sentenceForm.get('business_employee_ids').setValue(this.employeeId)
					}

					if (this.sentenceForm.get('business_employee_ids').value.length>1) {
						this.sentenceForm.get('is_group_sentence').setValue(true)

					}
					this.GetEmployee();			
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	employeeLists(data: any){
		this.employeeLoading=false
	
		let domy:any=[]
		console.log(this.employeeId,data.list);
		data.list.map((item:any)=>{
			this.employeeId.map((sentensItem)=>{
				// console.log(item);
				// console.log(item.business_employee_info);
				let obj= item.business_employee_info.find((item:any)=>item.business.id==this.businessId)
				// console.log(obj.id,sentensItem);
				// console.log(obj.business_employee_info);
				if (sentensItem==obj.id) {
					domy.push(item)
				}
			})
		})
		this.employeeList =domy.map((item: any) => {
			return new Employee().deserialize(item);
		});
   }


	CreateBusiness(data: any) {
		this.businessList = data.list.map((item: any) => {
			return new BusinessList().deserialize(item);
		});
	}

	
	async GetEmployee() {

		// const employerReq = this.global.httpPost('business/detail', {business_id:this.businessId});

		const employeeReq = this.global.httpPost('employee/filteredList', {limit: 1000,offset: 0,business_id:this.businessId});

		 this.global.parallelRequest([ employeeReq])
		.subscribe(async ([employee = '']) => {
			this.employeeLists(employee);
			// this.employerLists(employer);
		});

	}

	
	CreatecontractCondition(data: any) {
		this.contractConditionlist = data.list.map((item: any) => {
			return new contractConditions().deserialize(item);
		});
	}

	/* ==============================================================*/
	/* ==============================================================*/
	/* ==============================================================*/

	returnchildrenAllowanceName(id: number) {
		const data: Employee = this.employeeList.find((x) => x.id === id);
		if (data) {
			return data.first_name + ' ' + data.last_name;
		}
	}

	formatDate(value: string) {
		// console.log(this.datetime.dayValues);
		return format(new Date(value), 'yyyy-MM-dd');
	}

	getNameEmployee(id:number){
	
		if (this.employeeList&&this.employeeList.length!=0) {
		
		return	this.employeeList?.find(item=>item.business_employee_id===id)
		}
	}
	
	gerBEId(list:any[]){
		let domyList:any[]=[]
		list.map((item)=>{
			domyList.push(this.employeeList.find((employee)=>employee.id==item)?.business_employee_id)
		
		})
		// console.log(domyList);
		return domyList
	}

	// changeEmployee(e:any){
	// 	console.log(e);
	// }

	// !؟
	// async CalculationField() {
	// 	if (!this.submitet) {
	// 		if (this.sentenceForm.value.contract_year === '') {
	// 			this.global.showToast('سال عقد قرار داد را انتخاب کنید');
	// 			return;
	// 		}

	// 		if (!this.sentenceForm.get('is_manual').value) {
	// 			this.submitet = true;
	// 			await this.global.showLoading('لطفا منتظر بمانید...');
	// 			this.global
	// 				.httpPost(
	// 					'contract/calculatePrices',
	// 					this.sentenceForm.value
	// 				)
	// 				.subscribe(
	// 					async (res: any) => {
	// 						this.submitet = false;
	// 						await this.global.dismisLoading();

	// 						this.sentenceForm.get('bonus').setValue(res.bonus);
	// 						this.sentenceForm
	// 							.get('grocery_allowance')
	// 							.setValue(res.grocery_allowance);
	// 						this.sentenceForm
	// 							.get('housing_allowance')
	// 							.setValue(res.housing_allowance);
	// 						this.sentenceForm
	// 							.get('new_year_gift')
	// 							.setValue(res.new_year_gift);
	// 						this.sentenceForm
	// 							.get('severance_pay')
	// 							.setValue(res.severance_pay);
	// 						this.sentenceForm.get('wage').setValue(res.wage);

	// 						// console.log(res);
	// 					},
	// 					async (error: any) => {
	// 						this.submitet = false;
	// 						await this.global.dismisLoading();
	// 						this.global.showError(error);
	// 					}
	// 				);
	// 		}
	// 	}
	// }

	// AddAlowences(event: any) {
	// 	const data = this.employeeList.find((x) => x.id === event);
	// 	this.businessEmpId.push(data.business_employee_info[0].id);
	// 	this.childrenAllowancesList.push(
	// 		this.childrenAllowance(data.business_employee_info[0].id, data.id)
	// 	);
	// 	this.sentenceForm
	// 		.get('business_employee_ids')
	// 		.setValue(this.businessEmpId);
	// 	// console.log(this.sentenceForm.value.business_employee_ids);
	// 	// console.log(this.childrenAllowancesList);
	// }

	// removeAlowences(event: any) {
	// 	// console.log("removeAlowences",event);
	// 	this.businessEmpId.splice(event.index, 1);
	// 	this.childrenAllowancesList.controls.splice(event.index, 1);
	// 	this.sentenceForm
	// 		.get('business_employee_ids')
	// 		.setValue(this.businessEmpId);
	// 	// console.log(this.sentenceForm.value.business_employee_ids);
	// }

	// calcChildrenAllowance() {
	// 	if (
	// 		this.sentenceForm.value.contract_year !== '' &&
	// 		this.sentenceForm.value.business_employee_ids.length
	// 	) {
	// 		// console.log('calcChildrenAllowance');
	// 		this.global
	// 			.httpPost('contract/calculateChildrenAllowance', {
	// 				contract_year: this.sentenceForm.value.contract_year,
	// 				is_hourly_contract:
	// 					this.sentenceForm.value.is_hourly_contract,
	// 				employee_ids: this.sentenceForm.value.employee_ids,
	// 			})
	// 			.subscribe(
	// 				async (res: any) => {
	// 					this.childrenAllowanceFormGroup.controls.map(
	// 						(item: any) => {
	// 							const allowance = res.find(
	// 								(x: any) =>
	// 									x.employee_id === item.value.employee_id
	// 							).children_allowance;
	// 							item.get('children_allowance').setValue(
	// 								allowance
	// 							);
	// 						}
	// 					);
	// 				},
	// 				async (error: any) => {
	// 					this.global.showError(error);
	// 				}
	// 			);
	// 	} else {
	// 		// console.log('no-calcChildrenAllowance')
	// 	}
	// }
// ! ?
	async onSubmit() {
		// console.log('submit form');
		this.sentenceForm.markAllAsTouched();
		// console.log(this.sentenceForm)
		if (this.sentenceForm.valid) {
			this.submitet = true;
			if (this.sentenceForm.get('business_employee_ids').value.length>1) {
				this.sentenceForm.get('is_group_sentence').setValue(true)

			}else{
				this.sentenceForm.get('is_group_sentence').setValue(false)

			}
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('contractSentence/add', this.sentenceForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						this.navCtrl.navigateForward('/contracts/sentence/'+this.id);
						this.global.showToast(					
								'حکم جدید ثبت شد .'
						);
						this.sentenceForm.reset();
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
						this.submitet = false;
					}
				);
		} else {
			let errors: string[] = [];
			setTimeout(() => {
				this.validation.forEach((elem: any) => {
					if (elem.text) {
						errors.push(
							'<li class="font-size-14 color-danger">' +
								elem.text.el.innerText +
								'</li>'
						);
					}
				});
				this.global
					.showAlert(
						'خطا',
						'<ul class="px-4 my-0">' + errors.join('') + '</ul>',
						[
							{
								text: 'متوجه شدم',
								role: 'yes',
							},
						],
						'ابتدا موارد زیر را بررسی و سپس فرم را ثبت کنید'
					)
					.then((alert: any) => {
						alert.present();
					});
			}, 100);
		}
	}
}
