import { error } from './../../../core/models/other.models';
import { recognizance, recognizanceTemplate } from './../../../core/models/recognizance.model';
import { User } from './../../../core/models/user.model';
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
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { contract } from 'src/app/core/models/contractConstant.model';
import { contractExtraField } from 'src/app/core/models/contractExtraField.model';

@Component({
  selector: 'app-recognizance-list',
  templateUrl: './recognizance-list.component.html',
  styleUrls: ['./recognizance-list.component.scss'],
})
export class RecognizanceListComponent implements OnInit {

 
	pageTitle: string = " تعهدنامه ها";

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;
	end = false;
	Searching = 0;
	dataList: recognizance[];

	start_year: number;
	contract_year: number;

	filtered_business_id: number;
	filtered_employee_id: number;
	filtered_recognizance_template_id: number;

	businessList: BusinessList[] = [];
	employeeList: Employee[] = [];
	
	employeelist$: Observable<Employee[]>;
	employeeInputLoading = false;
	employeeInput$ = new Subject<string>();

	businesslist$: Observable<BusinessList[]>;
	businessInputLoading = false;
	businessInput$ = new Subject<string>();
	selectedMovie: any;
	minLengthTerm = 3;
	TemplatedataList:recognizanceTemplate[]
	
	// filtered_confirmer_id:number
	// filtered_title:string
	// filtered_confirm_date:string
	filtered_confirmer_list:User[]
	datepickerIsChange:boolean=false
	// date:FormGroup

	@ViewChildren('searchInp') Search: IonInput;

	constructor(
		public global: GlobalService,
		// private fb: FormBuilder,
		private seo: SeoService,
		public alertController: AlertController,
	) {
		// this.date=fb.group({
		// 	filtered_confirm_date:[]
		// })
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
		this.global.httpPost('recognizance/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_business_id: this.filtered_business_id,
			// filtered_employer_id: this.filtered_employer_id,
			filtered_employee_id: this.filtered_employee_id,
			filtered_recognizance_template_id: this.filtered_recognizance_template_id,

			// filtered_title:this.filtered_title,
			// filtered_confirm_date:this.date.value.filtered_confirm_date,
			// filtered_confirmer_id:this.filtered_confirmer_id,

		}).subscribe(async (res: any) => {
					this.datepickerIsChange=false
			await this.global.dismisLoading();
			this.total = res.totalRows;
			this.dataList = res.list.map((item: any) => {
				return new recognizance().deserialize(item);
			});
			console.log(this.dataList);

		}, async (error: any) => {
			this.datepickerIsChange=false

			await this.global.dismisLoading();
			this.global.showError(error);
		});
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
this.global.httpPost('recognizanceTemplate/filteredList',{limit:9999,offset:0}).subscribe(
	async (res:any) => {
		this.TemplatedataList = res.list.map((item: any) => {
			return new recognizanceTemplate().deserialize(item);
		});
		
	},
	async (error:any) => {
		this.global.showError(error)
		
	}
)


			this.loadBusiness()
			this.loadEmployee()
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

	CreateEmployee(data: any) {
		this.employeeList = data.list.map((item: any) => {
			return new Employee().deserialize(item);
		});
		// console.log(this.employeeList);
	}
	async removeItem(item : recognizance){
		this.global.showAlert('حذف تعهدنامه', `آیا برای حذف تعهد نامه ${item.title} اطمینان دارید؟`, [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert : any) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('recognizance/delete', {
						id: item.id,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();
						this.pageChange(1);
						this.global.showToast(res.msg);

					}, async (error:any) => {
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
	download(item : recognizance) {
		item.loadingDownload = true;
	

		this.global
			.httpPost('recognizance/pdf', { id:item.id })
			.subscribe(
				async (res: any) => {
					item.loadingDownload = false;
				;

					// console.log(res);
					// console.log(res.file);
					const byteArray = new Uint8Array(atob(res.file).split('').map(char => char.charCodeAt(0)));

					
					var file = new Blob([byteArray], {
						 type: 'application/pdf',
					});
					var fileURL = URL.createObjectURL(file);
					
					const link = document.createElement('a');
					link.href = fileURL;
					link.download = ` تعهدنامه ${item.title}.pdf`;
					document.body.append(link);
					link.click();
					link.remove();
					setTimeout(() => URL.revokeObjectURL(link.href), 7000);
				},
				async (error: any) => {
					item.loadingDownload = false;
					this.global.showError(error);
					// console.log(error);

				}
			);
	}



}
