import { concat, Observable, of, Subject,throwError } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	switchMap,
	tap,
	map,
	filter,
} from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, MenuController } from '@ionic/angular';
import { Employee } from '../core/models/employee.model';
import { GlobalService } from '../core/services/global.service';
import { SeoService } from '../core/services/seo.service';

@Component({
	selector: 'app-test',
	templateUrl: './test.page.html',
	styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

	dataList: Employee[] = [];
	limit: number = 20;
	offset: number = 0;
	total: number = 0;
	loading = false;
	end: boolean = false;
	searchVal : string;
	employeelist$: Observable<Employee[]>;
	inputLoading = false;
	employeeInput$ = new Subject<string>();
	minLengthTerm:number=3

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		public alertController: AlertController,
		private menu: MenuController
	) { }

	

	ngOnInit() {
		this.getData();
		this.loadEmployee(true)
		this.employeeInput$.next(null)
	}
	async getData() {


		if (this.dataList.length > 0 &&  this.end) {
			return;
		}
		this.loading = true;
		this.global.httpPost('employee/filteredList', {
			limit: this.limit,
			offset: this.offset,
			filtered_name : this.searchVal,
		}).subscribe(async (res: any) => {

			this.total = res.totalRows;
			this.loading = false;
			if (res.list.length < this.limit) {
				this.end = true
			}
			this.offset = this.offset + this.limit;
		
			const data = res.list.map((item: any) => {
				return new Employee().deserialize(item);
				// this.dataList.push(data);


			});
			this.dataList = this.dataList.concat(data);
			// this.dataList.concat(data);
			// console.log(this.dataList);

		}, async (error: any) => {
			this.loading = false;
			this.global.showError(error);
		});

	}

	onScrollToEnd() {
		// console.log('onScroll');
		this.end=true
		// this.getData();
	}

	onScroll({ end }: any) {
		// console.log(end + this.limit, this.dataList.length)
		if (this.loading || this.total <= this.dataList.length) {
			// console.log('end 1');
			return;
		}

		if (end + this.limit >= this.dataList.length) {
			// console.log('end 2');
			this.getData();
		}
	}

	searchFun(event:any){
		this.searchVal = event.term;
		this.loading = true;
		this.offset = 0;
		this.end = false;
		this.getData();
	}
	// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	loadEmployee(wantAll:boolean=false) {
		this.employeelist$ = concat(
			of([]), // default items
			this.employeeInput$.pipe(
				filter((res) => {
					if (!wantAll) {
						
						return res !== null && res.length >= this.minLengthTerm;
					}else{
						return true
					}
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.inputLoading = true)),
				switchMap((term) => {
					return this.getEmployee(term,wantAll).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.inputLoading = false))
					);
				})
			)
		);
	}

	getEmployee(term: string = null,wantAll:boolean=false): Observable<any> {
		console.log("object");
		const api= this.global
			.httpPost('employee/filteredList', {
				filtered_name: wantAll?'': term,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.pipe(
				map((resp) => {
					if (resp.Error) {
						throwError(resp.Error);
					} else {
						const employeeList= resp.list.map((item: any) => {
							console.log(item);
							return new Employee().deserialize(item);
						});
						if (wantAll) {
							this.employeelist$=employeeList
						}else{
							return employeeList
						}
					}
				})
			);

			return api
	}
	async getEmployeeById(employee_id: string = null) {
	await	this.global.showLoading()
		console.log(employee_id);
		this.global
			.httpPost('employee/filteredList', {
				employee_id,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading()
					console.log(of(res.list), res.list[0].id);
					this.employeelist$ = of(res.list.map((item: any) => {
						return new Employee().deserialize(item);
					})) ;
				
					// this.addForm.get('employee_id').setValue(res.list[0]?.id);
				},
				async (error: any) => {
					await this.global.dismisLoading()

					this.global.showError(error)
					console.log(error);
				}
			);
	}


}
