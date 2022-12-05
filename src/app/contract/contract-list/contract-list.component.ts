import { AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

import { BusinessList } from 'src/app/core/models/business.model';
import { Employee } from 'src/app/core/models/employee.model';
import { Employer } from 'src/app/core/models/employer.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { User } from './../../core/models/user.model';
import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';

@Component({
	selector: 'app-contract-list',
	templateUrl: './contract-list.component.html',
	styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {

	pageTitle: string = "قرار داد ها";

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: contract[];

	start_year: number;
	contract_year: number;

	filtered_business_id: number;
	filtered_employer_id: number;
	filtered_employee_id: number;

	businessList: BusinessList[] = [];
	empoloyerList: Employer[] = [];
	employeeList: Employee[] = [];
	
	employerlist$: Observable<Employer[]>;
	employerInputLoading = false;
	employerInput$ = new Subject<string>();
	
	employeelist$: Observable<Employee[]>;
	employeeInputLoading = false;
	employeeInput$ = new Subject<string>();

	businesslist$: Observable<BusinessList[]>;
	businessInputLoading = false;
	businessInput$ = new Subject<string>();
	selectedMovie: any;
	minLengthTerm = 3;
	
	filtered_confirmer_id:number
	filtered_is_confirmed :number
	filtered_title:string
	// filtered_confirm_date:string
	filtered_confirmer_list:User[]
	datepickerIsChange:boolean=false
	date:FormGroup

	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		public alertController: AlertController,
	) {
		this.date=fb.group({
			filtered_confirm_date:[]
		})
	 }

	ngOnInit() {
		// set jalali curent year

	}
	async ionViewWillEnter() {
		this.getData();
		this.setTitle();
		this.getFilters();
	}

	ChangeSearch(event: any) {
		// this.getData(event.detail.value.toString());
	}

	async getData() {
		// console.log(this.filtered_confirm_date);
		this.datepickerIsChange=true

		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('contract/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_business_id: this.filtered_business_id,
			filtered_employer_id: this.filtered_employer_id,
			filtered_employee_id: this.filtered_employee_id,

			filtered_title:this.filtered_title,
			filtered_confirm_date:this.date.value.filtered_confirm_date,
			filtered_confirmer_id:this.filtered_confirmer_id,
			filtered_is_confirmed :this.filtered_is_confirmed ,

		}).subscribe(async (res: any) => {
					this.datepickerIsChange=false
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new contract().deserialize(item);
			});
			console.log(this.dataList);

		}, async (error: any) => {
			this.datepickerIsChange=false

			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	datepickerChange(){
		console.log("object");
		if (!this.datepickerIsChange) {
			this.changeFilter() 
		}
	}
	getFilters() {
		// const countries = this.global.httpGet('more/countries');
		// const business = this.global.httpPost('business/filteredList',
		// 	{ limit: 2000, offset: 0 }
		// );

		// const empoloyer = this.global.httpPost('employer/filteredList',
		// 	{ limit: 2000, offset: 0 }
		// );

		// const employee = this.global.httpPost('employee/filteredList',
		// 	{ limit: 2000, offset: 0 }
		// );

		// this.global.parallelRequest([business, empoloyer, employee])
		// 	.subscribe(([businessRes, empoloyerRes = '', employeeRes = '']) => {

		// 		this.CreateBusiness(businessRes);
		// 		this.CreateEmployer(empoloyerRes);
		// 		this.CreateEmployee(employeeRes);

			// });
			this.loadBusiness()
			this.loadEmployer()
			this.loadEmployee()
			this.getConfirmData()
	}
	
	
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
	
	loadEmployer() {
		this.employerlist$ = concat(
			of([]), // default items
			this.employerInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.employerInputLoading = true)),
				switchMap((term) => {
					return this.getEmployer(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.employerInputLoading = false))
					);
				})
			)
		);
	}

	getEmployer(term: string = null): Observable<any> {
		return this.global
			.httpPost('employer/filteredList', {
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
							return new Employer().deserialize(item);
						});
					}
				})
			);
	}
	loadEmployee() {
		this.employeelist$ = concat(
			of([]), // default items
			this.employeeInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.employeeInputLoading = true)),
				switchMap((term) => {
					return this.getEmployee(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.employeeInputLoading = false))
					);
				})
			)
		);
	}

	getEmployee(term: string = null): Observable<any> {
		return this.global
			.httpPost('employee/filteredList', {
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
							return new Employee().deserialize(item);
						});
					}
				})
			);
	}
	getConfirmData(){
		this.global.httpGet('contract/confirmerList').subscribe(
			async (res:any) => {
				console.log(res);
				this.filtered_confirmer_list=res.map((confirmer:User)=>{
					return new User().deserialize(confirmer)
				})
				console.log(this.filtered_confirmer_list);
			},
			async (error:any) => {
				await this.global.showError(error)
			},
		)
	}

	changeFilter() {
		this.CurrentPage = 1;
		this.offset = 0;
		this.getData();
	}
	CreateBusiness(data: any) {
		this.businessList = data.list.map((item: any) => {
			return new BusinessList().deserialize(item);
		});
	}
	CreateEmployer(data: any) {
		this.empoloyerList = data.list.map((item: any) => {
			return new Employer().deserialize(item);
		});
		// console.log(this.empoloyerList);
	}
	CreateEmployee(data: any) {
		this.employeeList = data.list.map((item: any) => {
			return new Employee().deserialize(item);
		});
		// console.log(this.employeeList);
	}

	removeItem(item: contractExtraField) {
		this.global.showAlert('حذف قرار داد', 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert: any) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('salaryBaseInfo/contractExtraField', {
						id: item.id,
					}).subscribe(async (res: any) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData();

						this.global.showToast(res.msg);

					}, async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
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

	pageChange($event: any) {

		this.CurrentPage = $event;
		this.offset = (this.limit * this.CurrentPage) - this.limit;
		this.getData();
	}

	async removeContractALert(item: contract) {

		const employee : any[] = item.employee_info.map((item)=>{
			const input = {
				name: item.full_name,
				type : "checkbox",
				label : item.full_name,
				value : item.business_employee_id,
				checked : false,
			}
			return input;
		});
		console.log(employee);
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: item.title,
			subHeader: 'حذف قرار داد',
			message : ' حذف افراد از قرار داد'+item.title,
			inputs: employee,
			buttons: [
				{
					text: 'بی خیال',
					role: 'cancel',
					cssClass: 'dark',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'حذف کن',
					cssClass: 'medium',
					handler: (alertData) => {
						this.removeContract(item,alertData)
					}
				}
			]
		});

		await alert.present();
	}


	removeContract(item : contract , data : number[]){
		this.global.showAlert('حذف '+ this.pageTitle , 'آیا برای حذف اطمینان دارید؟', [
			{
				text: 'بلی',
				role: 'yes',
				cssClass: 'dark',
			},
			{
				text: 'خیر',
				role: 'cancel',
				cssClass: 'medium',
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {


					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('contract/delete', {
						id: item.id,
						is_group_deleting : (item.employee_info.length === data.length ? 1 : 0 ) ,
						business_employee_ids : data
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();

						this.offset = 0;
						this.CurrentPage = 1;
						this.getData();

						this.global.showToast(res.msg);

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}
}
