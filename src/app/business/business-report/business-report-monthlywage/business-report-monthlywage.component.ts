import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { reportLeave } from 'src/app/core/models/report.model';
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
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-business-report-monthlywage',
  templateUrl: './business-report-monthlywage.component.html',
  styleUrls: ['./business-report-monthlywage.component.scss'],
})
export class BusinessReportMonthlywageComponent implements OnInit {
  pageTitle:string='گزارشات دستمزد ماهیانه'

	columnHighcharts: typeof Highcharts = Highcharts;
	plotShow: boolean = false;
	data: reportLeave[];
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

	constructor(private global: GlobalService,  private fb:FormBuilder,private rout:ActivatedRoute) {
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
      this.getData(this.id)
	}
  // ngOnChanges(changes: SimpleChanges) {
    // this.getData();
  //   // console.log(changes);
  //   // console.log(changes.businessId.currentValue);
  
  // }
  
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
	startdatepickerChange(e:any){
   
		if (!this.startDatepickerIsChange) {
      console.log( this.startDate.value.filtered_from_date);
			this.getData(this.id,e.shamsi?e.shamsi:null,this.endDate.get('filtered_to_date').value) 
		}
	}
	enddatepickerChange(e:any){
		if (!this.endDatepickerIsChange) {
			this.getData(this.id,this.startDate.get('filtered_from_date').value,e.shamsi?e.shamsi:null) 
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

	setcolumnChart(dataSet: reportLeave[]) {
		if (this.plotShow) {
			this.plotShow=false
		}
		console.log(dataSet);
		// const malePercent=Math.round((dataSet.male_count/dataSet.total_count)*100*100)/100
		// const femalePercent=Math.round((dataSet.female_count/dataSet.total_count)*100*100)/100
		const dataSetgroupBy = groupBy(dataSet, (x) => {
			return x.year;
		});
console.log(dataSetgroupBy);
		let fackData = [];
		for (const year in dataSetgroupBy) {
			for (let index = 1; index <= 12; index++) {
				
				if (
					dataSet.findIndex((item) => {
						return item.month == index;
					}) == -1
				) {
					fackData.push(
						new reportLeave().deserialize({
							business_name: '',
							year,
							month: index,
							amount: 0,
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

		const dataColumn = fackData.map((item: reportLeave) => {
			return Math.round(item.amount*10)/10 ;
		});
		const dataCategories = fackData.map((item: reportLeave) => {
			if (Object.keys(dataSetgroupBy).length>1 ) {
				return this.global.getMonthName[item.month]+'/'+item.year;

			}else{
				return this.global.getMonthName[item.month];

			}
		});
    console.log(dataCategories);
	
		this.columnChartOptions = {
			chart:{
				style:{
					fontFamily:'IRANSans'
				}
			},
			title: {
				text: Object.keys(dataSetgroupBy).length!=1?'دسمزد های ماهیانه':' دسمزد های ماهیانه سال '+Object.keys(dataSetgroupBy)[0],
			},
			subtitle: {
				text:
					' مجموع دسمزد هرماه را به تفکیک میتوانید مشاهده کنید ' 
					
			},
			tooltip: {
				// headerFormat:,
				pointFormat:
        `<table dir="rtl"><tr><td  style="font-size:10px ">{series.name}</td></tr>`+
					'<tr><td style="padding:0;text-align: "center";width: 100%;margin="0 auto""><b>{point.y:.1f}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true,
       
			},
     
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
					name: 'مجموع دستمزد ماهیانه',
					colorByPoint: true,
					data: dataColumn,
					showInLegend: false,
          
					
					// tittle:''
				},
			],
		};
		// console.log(dataColumn);
		setTimeout(() => {
			this.plotShow = true;
		}, 500);
	}
	async getData(	filtered_business_id:string=this.id,filtered_from_date:string=this.startDate.get('filtered_from_date').value,filtered_to_date:string=this.endDate.get('filtered_to_date').value) {
		
		this.startDatepickerIsChange=true
		this.endDatepickerIsChange=true

		// await this.global.showLoading();
		this.loading=true
		// if (this.plotShow) {
		// 	this.plotShow=false
		// }
		this.global
			.httpPost('report/payroll/monthlyWage', {
				filtered_business_id ,
				filtered_employee_id: this.filtered_employee_id,
				filtered_to_date ,
				filtered_from_date,
			})
			.subscribe(
				async (res: any) => {
					this.startDatepickerIsChange=false
					this.endDatepickerIsChange=false

					// await this.global.dismisLoading();
					this.loading=false
					console.log(res);
					this.data = res.list.map((item: reportLeave) => {
						return new reportLeave().deserialize(item);
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
