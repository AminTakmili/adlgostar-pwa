import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { reportPayroll } from 'src/app/core/models/report.model';
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
  selector: 'app-business-report-payroll-payrollseparatelydetail',
  templateUrl: './business-report-payroll-payrollseparatelydetail.component.html',
  styleUrls: ['./business-report-payroll-payrollseparatelydetail.component.scss'],
})
export class BusinessReportPayrollPayrollseparatelydetailComponent implements OnInit {

  @Input('businessId')businessId:string
	columnHighcharts: typeof Highcharts = Highcharts;
	plotShow: boolean = false;
	data: reportPayroll[];
	columnChartOptions: Highcharts.Options = {
		chart: {
			type: 'Highcharts',
		},
		title: {
			text: '',
		},
	};
	// id: string;
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

	constructor(private global: GlobalService,  private fb:FormBuilder) {
		// this.id = rout.snapshot.paramMap.get('id');
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
	// ionViewWillEnter() {
	// 	this.getData();
	// }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // console.log(changes.businessId.currentValue);
    this.getData(changes.businessId.currentValue)
  
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
	startdatepickerChange(e:any){
   
		if (!this.startDatepickerIsChange) {
      console.log( this.startDate.value.filtered_from_date);
			this.getData(this.businessId,e.shamsi?e.shamsi:null,this.endDate.get('filtered_to_date').value) 
		}
	}
	enddatepickerChange(e:any){
		if (!this.endDatepickerIsChange) {
			this.getData(this.businessId,this.startDate.get('filtered_from_date').value,e.shamsi?e.shamsi:null) 
		}
	}

	getEmployee(term: string = null): Observable<any> {
		return this.global
			.httpPost('employee/filteredList', {
				filtered_name: term,
				business_id:this.businessId,

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

	setcolumnChart(dataSet: reportPayroll[]) {
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
		let startMonth= this.startDate.get('filtered_from_date').value?parseInt(this.startDate.get('filtered_from_date').value.split("/")[1]):1
		let endMonth=this.endDate.get('filtered_to_date').value?parseInt(this.endDate.get('filtered_to_date').value.split("/")[1]):12
		for (const year in dataSetgroupBy) {
			for (let index = startMonth; index <= endMonth; index++) {
				
				if (
					dataSet.findIndex((item) => {
						return item.month == index;
					}) == -1
				) {
					fackData.push(
						new reportPayroll().deserialize({
							business_name: '',
							year,
							month: index,
							
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

    console.log(fackData);
   
    let seriesData:Array<any> =[]
    fackData.map((item: reportPayroll) => {
      // console.log(item.detailObject);
			// return Math.round(item.amount*10)/10 ;
      item.detailObject.map((data:any)=>{
        // console.log(data.faName);
        // console.log( seriesData.find((value)=>{return value.name==data.faName }));
        if (seriesData.find((value)=>{return value.name==data.faName })) {
          seriesData.find((value)=>{return value.name==data.faName }).data.push(data.amount)
        }else{
          seriesData.push(
            {
              name:data.faName,
              data:[data.amount]
            }
          )
        }
        // seriesData.find((value)=>{return value.name==data.faName })
      })
		});

    console.log(seriesData);
		const dataCategories = fackData.map((item: reportPayroll) => {
			if (Object.keys(dataSetgroupBy).length>1 ) {
				return this.global.getMonthName[item.month]+'/'+item.year;

			}else{
				if (this.endDate.get('filtered_to_date').value) {
					
					if (item.month<=parseInt(this.endDate.get('filtered_to_date').value.split("/")[1])) {
						return this.global.getMonthName[item.month];

					}
				}
				if (this.startDate.get('filtered_from_date').value) {
					
					if (item.month>=parseInt(this.startDate.get('filtered_from_date').value.split("/")[1])) {
						return this.global.getMonthName[item.month];

					}
				}
				if (!this.endDate.get('filtered_to_date').value&&!this.startDate.get('filtered_from_date').value) {
					
					return this.global.getMonthName[item.month];
				}

			}
		});
    console.log(dataCategories);
	
		this.columnChartOptions = {
			chart:{
				style:{
					fontFamily:'IRANSans'
				},
				type: 'column'
			},
			title: {
				text: Object.keys(dataSetgroupBy).length!=1?'جزئیات فیش های حقوقی':' جزئیات فیش های حقوقی سال '+Object.keys(dataSetgroupBy)[0],
			},
			subtitle: {
				text:
					' جزئیات فیش های حقوقی هرماه را به تفکیک میتوانید مشاهده کنید ' 
					
			},
			tooltip: {
				headerFormat: '<div class="header"> <span  style="font-size:10px;text-align:center;margin:0 auto; wid:100%;"> <b> {point.key} </b></span></div><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true,
				style:{
					height:2,
					overflow: 'scroll'
				},
				
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0,
					
				}
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
			series: seriesData
		};
		// console.log(dataColumn);
		setTimeout(() => {
			this.plotShow = true;
		}, 1500);
	}
	async getData(	filtered_business_id:string=this.businessId,filtered_from_date:string=this.startDate.get('filtered_from_date').value,filtered_to_date:string=this.endDate.get('filtered_to_date').value) {
		
		this.startDatepickerIsChange=true
		this.endDatepickerIsChange=true

		// await this.global.showLoading();
		this.loading=true
		// if (this.plotShow) {
		// 	this.plotShow=false
		// }
		this.global
			.httpPost('report/payroll/payrollList', {
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
					this.data = res.list.map((item: reportPayroll) => {
						return new reportPayroll().deserialize(item);
					});
          console.log(this.data );
       
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
