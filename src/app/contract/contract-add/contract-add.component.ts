import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import { compareAsc, format, newDate } from 'date-fns-jalali'
import { BusinessList } from 'src/app/core/models/business.model';
import { Employee } from 'src/app/core/models/employee.model';
import { contractConditions, contractTemplate } from 'src/app/core/models/contractConstant.model';
import * as _ from 'lodash';

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

	@ViewChild("popoverDatetime2",{ static: true }) datetime: IonDatetime;

	dateValue: string = '';
	dateValue2 = '';

	datePickerConfig = {
		drops: 'up',
		format: 'YY/M/D'
	}

	businessList: BusinessList[] = [];
	employeeList: Employee[] = [];
	contractTemplatelist : contractTemplate[] ;
	contractConditionlist : contractConditions[] =  [];
	provisosList: FormArray;

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
			business_employee_id: [[], Validators.compose([Validators.required])],
			contract_template_id: ['', Validators.compose([Validators.required])],
			main_text: ['', Validators.compose([Validators.required])],
			contract_year: ['', Validators.compose([Validators.required])],
			end_text: [''],
			start_date: ['', Validators.compose([Validators.required])],
			end_date: ['', Validators.compose([Validators.required])],
			employee_start_date: ['', Validators.compose([Validators.required])],
			is_manual: ['', Validators.compose([Validators.required])],
			is_contract_for_future: ['', Validators.compose([Validators.required])],
			is_hourly_contract: ['', Validators.compose([Validators.required])],
			calc_severance_base: ['', Validators.compose([Validators.required])],
			wage: ['', Validators.compose([Validators.required])],
			grocery_allowance: ['', Validators.compose([Validators.required])],
			children_allowance: ['', Validators.compose([Validators.required])],
			food_cost: ['', Validators.compose([Validators.required])],
			pension_cost: ['', Validators.compose([Validators.required])],
			housing_allowance: ['', Validators.compose([Validators.required])],
			calc_severance_pay_monthly: ['', Validators.compose([Validators.required])],
			severance_pay: ['', Validators.compose([Validators.required])],
			calc_new_year_gift_monthly: ['', Validators.compose([Validators.required])],
			new_year_gift: ['', Validators.compose([Validators.required])],
			calc_bonus_monthly: ['', Validators.compose([Validators.required])],
			bonus: ['', Validators.compose([Validators.required])],

			provisos:  this.fb.array([]),
			extra_fields: [''],

		});

		this.provisosList = this.contractsForm.get('provisos') as FormArray;


	}

	provisos(id : number  , text = ''): FormGroup {
		return this.fb.group({
			contract_proviso_template_id: [id, Validators.compose([Validators.required])],
			proviso_text: [text, Validators.compose([Validators.required])],
		})
	}

	addCondition(){

		console.log(this.contractsForm.value.contract_condition_id)
		if(this.contractsForm.value.contract_condition_id.length){
			this.contractsForm.value.contract_condition_id.map((item : number)=>{
				const condition = _.find(this.contractConditionlist, {id:item});
				const index =_.findIndex(this.provisosFormGroup.controls,(element:any)=>{
					return element.value.contract_proviso_template_id == item ;
				},-1);

				if(index === -1){
					this.provisosList.push(this.provisos(condition.id,condition.template));
				}
				// }
			})
		}

	}

	RemoveCondition(event : any){

		this.provisosFormGroup.controls.splice(event.index, 1);
	}
	get provisosFormGroup(): FormArray {
		return <FormArray>this.contractsForm.get('provisos');
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

		this.global.parallelRequest([business, contractTheme, contractCondition])
			.subscribe(([businessRes, contractThemeRes ='', contractConditionRes  ='']) => {
				this.CreateBusiness(businessRes);
				this.CreatecontractTheme(contractThemeRes);
				this.CreatecontractCondition(contractConditionRes);
			});
	}

	async GetEmployee() {
		if (this.contractsForm.value.business_id) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('employee/filteredList', {
				limit: 1000,
				offset: 0,
				business_id: this.contractsForm.value.business_id,
			}).subscribe(async (res:any) => {
				await this.global.dismisLoading();
				this.employeeList = res.list.map((item: any) => {
					return new Employee().deserialize(item);
				});
				console.log(this.employeeList);

				// this.dataList = new contractTemplate().deserialize(res);
				// console.log(this.dataList);
				// console.log(this.dataList);
				// console.log(res:any);
			}, async (error:any) => {
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
		console.log(this.businessList);
	}

	CreatecontractTheme(data: any) {
		this.contractTemplatelist = data.list.map((item: any) => {
			return new contractTemplate().deserialize(item);
		});
		console.log(this.contractTemplatelist);
	}

	CreatecontractCondition(data: any) {
		this.contractConditionlist = data.list.map((item: any) => {
			return new contractConditions().deserialize(item);
		});
		console.log(this.contractConditionlist);
	}

	setContractTheme(){
		const id = this.contractsForm.value.contract_template_id ;
		this.contractsForm.value.main_text ="سلام" ;
		 this.contractTemplatelist.map((item)=>{
			if(item.id === id){
				this.contractsForm.get('main_text').setValue(item.template) ;
			}
		});
		console.log(this.contractsForm.value.main_text);
	}

	onSubmit() {

	}
	formatDate(value: string) {
		console.log(this.datetime.dayValues);
		return format(new Date(value), 'yyyy-MM-dd');
	}


}
