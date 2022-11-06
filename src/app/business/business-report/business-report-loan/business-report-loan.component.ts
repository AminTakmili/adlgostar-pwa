import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from './../../../core/models/employee.model';
import { GlobalService } from './../../../core/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { reportLoan } from 'src/app/core/models/report.model';
import { groupBy } from 'lodash';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	tap,
} from 'rxjs/operators';
import { Observable, Subject, concat, of, throwError } from 'rxjs';

@Component({
	selector: 'app-business-report-loan',
	templateUrl: './business-report-loan.component.html',
	styleUrls: ['./business-report-loan.component.scss'],
})
export class BusinessReportLoanComponent implements OnInit {
	pageTitle:string='گزارش وام ها'
	columnHighcharts: typeof Highcharts = Highcharts;
	plotShow: boolean = false;
	data: reportLoan[];
	columnChartOptions: Highcharts.Options = {
		chart: {
			type: 'Highcharts',
		},
		title: {
			text: '',
		},
	};
	id: string;
	// filtered_to_date: string;
	// filtered_from_date: string;
	filtered_employee_id: number;
	employeelist$: Observable<Employee[]>;
	employeeInputLoading = false;
	employeeInput$ = new Subject<string>();
	minLengthTerm = 3;
	startDate:FormGroup
	endDate:FormGroup

	startDatepickerIsChange:boolean=false
	endDatepickerIsChange:boolean=false
	loading:boolean=false

	constructor(private global: GlobalService, private rout: ActivatedRoute, private fb:FormBuilder) {
		this.id = rout.snapshot.paramMap.get('id');
		this.startDate=fb.group({
			filtered_from_date:[]
		})
		this.endDate=fb.group({
			filtered_to_date:[]
		})

	}

	ngOnInit() {
		this.loadEmployee()
	}
	ionViewWillEnter() {
		this.getData();
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
	startdatepickerChange(){
		if (!this.startDatepickerIsChange) {
			this.getData() 
		}
	}
	enddatepickerChange(){
		if (!this.endDatepickerIsChange) {
			this.getData() 
		}
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

	setcolumnChart(dataSet: reportLoan[]) {
		if (this.plotShow) {
			this.plotShow=false
		}
		console.log(dataSet);
		// const malePercent=Math.round((dataSet.male_count/dataSet.total_count)*100*100)/100
		// const femalePercent=Math.round((dataSet.female_count/dataSet.total_count)*100*100)/100
		const dataSetgroupBy = groupBy(dataSet, (x) => {
			return x.year;
		});

		let fackData = [];
		for (const year in dataSetgroupBy) {
			for (let index = 1; index <= 12; index++) {
				
				if (
					dataSet.findIndex((item) => {
						return item.month == index;
					}) == -1
				) {
					fackData.push(
						new reportLoan().deserialize({
							business_name: '',
							year,
							month: index,
							sum_loan_amount: 0,
						})
					);
				} else {
					
					fackData.push(
						dataSet.find((item) => {
							return item.month == index;
						})
					);
				}
			}
		}

		const dataColumn = fackData.map((item: reportLoan) => {
			return item.sum_loan_amount;
		});
		const dataCategories = fackData.map((item: reportLoan) => {
			if (Object.keys(dataSetgroupBy).length>1 ) {
				return this.global.getMonthName[item.month]+'/'+item.year;

			}else{
				return this.global.getMonthName[item.month];

			}
		});
	
		this.columnChartOptions = {
			chart:{
				style:{
					fontFamily:'IRANSans'
				}
			},
			title: {
				text: Object.keys(dataSetgroupBy).length!=1?'وام ها':' وام های سال '+Object.keys(dataSetgroupBy)[0],
			},
			subtitle: {
				text:
					' مجموع وام های هرماه را به تفکیک میتوانید مشاهده کنید ' 
					
			},
			// tooltip: {
			// 	headerFormat: `<span style="font-size:10px">{dataSet.business_name}</span><table>`,
			// 	pointFormat:
			// 		'<tr><td style="color:{series.color};padding:0">{point.x}: </td>' +
			// 		'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
			// 	footerFormat: '</table>',
			// 	shared: true,
			// 	useHTML: true,
			// },
			xAxis: {
				categories: dataCategories,
				labels: {
					align: 'right',
					// x: -10,
					y: 20
				},
				// title: {
				// 	text: 'مقادیر'
				// }
			
				
			},
			yAxis:{

				title: {
					text: 'مقادیر',
					style:{

						fontSize:'15px'
					}
				}
			},
			series: [
				{
					type: 'column',
					name: 'مجموع وام ها',
					colorByPoint: true,
					data: dataColumn,
					showInLegend: false,
					
					// tittle:''
				},
			],
		};
		
		setTimeout(() => {
			this.plotShow = true;
		}, 500);
	}
	async getData() {
		
		this.startDatepickerIsChange=true
		this.endDatepickerIsChange=true

		// await this.global.showLoading();
		this.loading=true
		// if (this.plotShow) {
		// 	this.plotShow=false
		// }
		this.global
			.httpPost('report/businessEmployee/loanList', {
				filtered_business_id: this.id,
				filtered_employee_id: this.filtered_employee_id,
				filtered_to_date: this.endDate.value.filtered_to_date,
				filtered_from_date: this.startDate.value.filtered_from_date,
			})
			.subscribe(
				async (res: any) => {
					this.startDatepickerIsChange=false
					this.endDatepickerIsChange=false

					// await this.global.dismisLoading();
					this.loading=false
					console.log(res);
					this.data = res.list.map((item: reportLoan) => {
						return new reportLoan().deserialize(item);
					});
					this.setcolumnChart(this.data);
				},
				async (error: any) => {
					this.startDatepickerIsChange=false
					this.endDatepickerIsChange=false

					// await this.global.dismisLoading();
					this.loading=false
					
					this.global.showError(error);
				}
			);
	}
	
}
