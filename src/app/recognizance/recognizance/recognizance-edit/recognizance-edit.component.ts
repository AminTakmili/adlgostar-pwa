import { recognizance, recognizanceTemplate } from './../../../core/models/recognizance.model';
import { contractHeaderTemplate, contractFooterTemplate } from './../../../core/models/contractConstant.model';
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

import { ActivatedRoute } from '@angular/router';
import { BusinessList } from 'src/app/core/models/business.model';
import { CKEditorComponent } from 'ng2-ckeditor';
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { format } from 'date-fns-jalali'
@Component({
  selector: 'app-recognizance-edit',
  templateUrl: './recognizance-edit.component.html',
  styleUrls: ['./recognizance-edit.component.scss'],
})
export class RecognizanceEditComponent implements OnInit {

  @ViewChildren('validation') validation: QueryList<any>;
	pageTitle: string = "افزودن تعهدنامه";
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
	recognizanceTemplatelist: recognizanceTemplate[];
	contractHeaderTemplatelist: contractHeaderTemplate[];
	contractFooterTemplatelist: contractFooterTemplate[];

	contractHeaderTemplateInfoList: FormArray;
	contractFooterTemplateInfoList: FormArray;

	businessEmpId : number;
	businessId :string;
	

	businesslist$: Observable<BusinessList[]>;
	businessInputLoading = false;
	businessInput$ = new Subject<string>();
  detailDataObj:recognizance
	
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
	id:string
	EmployeeId:string

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private router: ActivatedRoute,
		
	) {
		this.businessEmployeeId=router.snapshot.paramMap.get('businessEmployeeId')
		this.id=router.snapshot.paramMap.get('id')
		// this.EmployeeId=router.snapshot.paramMap.get('EmployeeId')
		this.EmployeeId=router.snapshot.queryParamMap.get('EmployeeId')
		this.businessId=router.snapshot.queryParamMap.get('business_id')
		// console.log(
		// router.snapshot.queryParamMap.getAll('emId')	
		// );
		console.log(this.businessId);

// console.log(this.businessEmployeeId);
		this.contractsForm = this.fb.group({
			id:[this.id],
			title: ['', Validators.compose([Validators.required])],
			business_id: [, Validators.compose([Validators.required])],	
			employee_ids: [, Validators.compose([Validators.required])],
			business_employee_id: [[], Validators.compose([Validators.required])],
			recognizance_template_id: ['', Validators.compose([Validators.required])],
			main_text: ['', Validators.compose([Validators.required])],
			end_text: [''],
			// employee_start_date: ['', Validators.compose([Validators.required])],
			start_date: ['', Validators.compose([Validators.required])],
			

			recognizance_header_template_info: this.fb.array([]),
			recognizance_footer_template_info: this.fb.array([]),

		});

		
		this.contractHeaderTemplateInfoList = this.contractsForm.get('recognizance_header_template_info') as FormArray;
		this.contractFooterTemplateInfoList = this.contractsForm.get('recognizance_footer_template_info') as FormArray;


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
		this.getDatas();
	}

	setTitle() {
		this.seo.generateTags({
			title: 'افزودن تعهدنامه جدید',
			description: 'تعهدنامه جدی ',
			keywords: "تعهدنامه جدی",
			isNoIndex: false,
		});
	}

	/* ============================== All form arrays ===========================================*/
	get contractHeaderTemplateInfoListGroup(): FormArray {
		return this.contractsForm.get('recognizance_header_template_info') as FormArray;
	}
	get contractFooterTemplateInfoListGroup(): FormArray {
		return this.contractsForm.get('recognizance_footer_template_info') as FormArray;
	}

	newContractHeaderTemplateInfoList(input?:any): FormGroup {
		return this.fb.group({
			recognizance_header_template_id: [input?.recognizance_header_template_id],
			header_text: [input?.header_text],
		})
	}
	newContractFooterTemplateInfoList(input?:any): FormGroup {
		return this.fb.group({
			recognizance_footer_template_id: [input?.recognizance_footer_template_id],
			footer_text: [input?.footer_text],
		})
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


	getDatas() {
		// const countries = this.global.httpGet('more/countries');

		// const business = this.global.httpPost('business/filteredList',{ limit: 2000, offset: 0 });
		if (this.businessEmployeeId||this.businessId) {
			this.getBusinessById(this.businessEmployeeId,this.businessId);
		} else {
			this.loadBusiness()
		}
		const recognizanceTheme = this.global.httpPost('recognizanceTemplate/filteredList',{ limit: 2000, offset: 0 });
		const contractHeaderTheme = this.global.httpPost('contractHeaderTemplate/filteredList',{ limit: 2000, offset: 0 ,filtered_name:''});
		const contractFooterTheme = this.global.httpPost('contractFooterTemplate/filteredList',{ limit: 2000, offset: 0,filtered_name:'' });
		const detailData = this.global.httpPost('recognizance/detail',{ id:this.id });

		// const contractCondition = this.global.httpPost('contractProvisoTemplate/list',{ limit: 2000, offset: 0 });

		// const contractExtra = this.global.httpGet('salaryBaseInfo/contractExtraFieldList');

		// const severanceBaseCalculation = this.global.httpPost('salaryBaseInfo/severanceBaseCalculationFieldList',{ limit: 1000, offset: 0 });

		this.global.parallelRequest([ recognizanceTheme,contractHeaderTheme,contractFooterTheme,detailData])
		.subscribe(([ recognizanceThemeRes = '',contractHeaderThemeRes='',contractFooterThemeRes='',detailDataRes='']) => {
			// this.CreateBusiness(businessRes);
			this.recognizanceTheme(recognizanceThemeRes);
			this.CreatecontractHeaderTheme(contractHeaderThemeRes);
			this.CreatecontractFooterTheme(contractFooterThemeRes);
			this.detailData(detailDataRes);
		
		});
	}
  detailData(data:any){
	console.log(data);
    this.detailDataObj= new recognizance().deserialize(data)
    // this.contractsForm.patchValue(this.detailDataObj)
	this.contractsForm.get('start_date').setValue(data.start_date)
	this.contractsForm.get('title').setValue(data.title)
	this.contractsForm.get('recognizance_template_id').setValue(data.recognizance_template_id)
	this.contractsForm.get('main_text').setValue(data.main_text)
	this.contractsForm.get('end_text').setValue(data.end_text)
	this.contractsForm.get('business_employee_id').setValue(data.business_employee_id)
    this.businessEmployeeId=String( this.detailDataObj.business_employee_id)
    this.businessId=String( this.detailDataObj.business_info.id)
    this.EmployeeId=String( this.detailDataObj.employee_info.id)
    this.getBusinessById(this.businessEmployeeId,this.businessId);
	this.contractFooterTemplateInfoList.push(this.newContractFooterTemplateInfoList(data.recognizance_footer_template_info))
	this.contractHeaderTemplateInfoList.push(this.newContractHeaderTemplateInfoList(data.recognizance_header_template_info))
	


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
	
			// const employerReq = this.global.httpPost('business/detail', {business_id: this.contractsForm.value.business_id});
	
			const employeeReq = this.global.httpPost('employee/filteredList', {limit: 1000,offset: 0,business_id: this.contractsForm.value.business_id});
	
			 this.global.parallelRequest([ employeeReq])
			.subscribe(async ([ employee = '']) => {
				await this.global.dismisLoading();
				// this.contractsForm.controls.employer_ids.setValue('')
				this.contractsForm.controls.employee_ids.setValue('')
				this.employeeLists(employee);
			});
		}else{
			this.contractsForm.controls.business_id.markAsTouched()
			this.employeeList=[]
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

	recognizanceTheme(data: any) {
		console.log(data);
		this.recognizanceTemplatelist = data.list.map((item: any) => {
			return new recognizanceTemplate().deserialize(item);
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




	employeeLists(data: any){
		if(data.list.length === 0){
			this.employeeList = [];
			this.global.showToast('کسب کار فاقد کارمند می باشد . ابتدا از قسمت کسب کار به این کسب و کار کارمند اضاف کنید');

		}else{
			this.employeeList = data.list.map((item: any) => {
				return new Employee().deserialize(item);
			});
			if (this.EmployeeId ) {
				let domy:number=Number(this.EmployeeId) 
				
				this.contractsForm.get('employee_ids').setValue(domy);
				console.log(domy);
				// this.calcChildrenAllowance()
				
			}
		}

	}

	/* ==============================================================*/
	/* ==============================================================*/
	/* ==============================================================*/



	setHeaderContractTheme() {
		
		const id = 	this.contractHeaderTemplateInfoListGroup.value[0].recognizance_header_template_id;
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
		
		const id = 	this.contractFooterTemplateInfoListGroup.value[0].recognizance_footer_template_id;
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
		const id = this.contractsForm.value.recognizance_template_id;
		this.recognizanceTemplatelist.map((item) => {
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



	// AddEmployee(event: any) {
	// 	console.log(event);
	// 	console.log(this.businessEmpId);
	// 	const data = this.employeeList.find(x=> x.id === event);
	// 	this.businessEmpId.push(data.business_employee_info[0].id);
	// 	this.contractsForm.get('business_employee_ids').setValue(this.businessEmpId);
	// 	// console.log(this.contractsForm.value.business_employee_ids);
	// 	// console.log(this.childrenAllowancesList);
	// }
  // 	removeEmployee(event: any) {

	// 	// console.log("removeAlowences",event);
	// 	this.businessEmpId.splice(event.index, 1);
	// 	this.contractsForm.get('business_employee_ids').setValue(this.businessEmpId);
	// 	// console.log(this.contractsForm.value.business_employee_ids);
	// }

  changeEmployee(event: any){
    const data = this.employeeList.find(x=> x.id === event);
		this.businessEmpId=(data.business_employee_info[0].id);
		this.contractsForm.get('business_employee_id').setValue(this.businessEmpId);
  }



	async onSubmit() {
		// console.log('submit form');
		this.contractsForm.markAllAsTouched();
		console.log(this.contractsForm)
		if (this.contractsForm.valid) {
			this.submitet = true;
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('recognizance/edit', this.contractsForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					this.global.showToast(' تعهدنامه با نام  ' + this.contractsForm.value.title + ' ویرایش شد .');
					this.navCtrl.navigateForward('/recognizance/list');
					this.contractsForm.reset();

				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
					this.submitet = false;
				});
		}
		//  else {

		// 	let errors: string[] = [];
		// 	setTimeout(() => {
		// 		this.validation.forEach((elem: any) => {
		// 			if (elem.text) {
		// 				errors.push('<li class="font-size-14 color-danger">' + elem.text.el.innerText + '</li>');
		// 			}
		// 		});
		// 		this.global.showAlert(
		// 			'خطا',
		// 			'<ul class="px-4 my-0">' + errors.join('') + '</ul>',
		// 			[{
		// 				text: 'متوجه شدم',
		// 				role: 'yes'
		// 			}],
		// 			'ابتدا موارد زیر را بررسی و سپس فرم را ثبت کنید'
		// 		).then((alert: any) => {
		// 			alert.present();
		// 		});
		// 	}, 100);

		// }
	}

}
