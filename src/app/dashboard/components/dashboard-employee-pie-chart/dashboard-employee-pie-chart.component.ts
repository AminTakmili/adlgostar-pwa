import { style } from '@angular/animations';
import { GlobalService } from 'src/app/core/services/global.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-dashboard-employee-pie-chart',
	templateUrl: './dashboard-employee-pie-chart.component.html',
	styleUrls: ['./dashboard-employee-pie-chart.component.scss'],
})
export class DashboardEmployeePieChartComponent implements OnInit,OnChanges {
  @Input('employee_separately_count') employee_separately_count:any
	PieHighcharts: typeof Highcharts = Highcharts;
  plotShow:boolean=false
	data: any;
	pieChartOptions: Highcharts.Options = {
		chart: {
			type: 'pie',
		},
		title: {
			text: '',
		},
	};
	constructor(public global: GlobalService) {}



	ngOnInit() {
    // this.getData()
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(changes.employee_separately_count);
    console.log(this.employee_separately_count);
    console.log(changes.employee_separately_count.currentValue);
    this.setPieChart(changes.employee_separately_count.currentValue)
  
  }
  

	setPieChart(dataSet: any) {
		// console.log(this.dataSelected1);
		// console.log(this.dataSelected2);
		// console.log(this.dataSelected3);
		// console.log(dataSet);

		// const dataPie = dataSet.employee_separately_count.map((x: any) => {
		// 	let pieCharts: any;
		// 	pieCharts.name = x.gas_name;
		// 	pieCharts.y = x.amount;
		// 	return pieCharts;
		// });

    var pieColors = ['#7CB5EC','#F45B5B']

    console.log(dataSet);
    // const malePercent=Math.round((dataSet.male_count/dataSet.total_count)*100*100)/100
    // const femalePercent=Math.round((dataSet.female_count/dataSet.total_count)*100*100)/100
    const malePercent=(dataSet.male_count/dataSet.total_count)*100
    const femalePercent=(dataSet.female_count/dataSet.total_count)*100
    console.log(malePercent,femalePercent);
    const dataPie=[ 
      { name: 'مردان', y: malePercent,count:dataSet.male_count },
    { name: 'زنان', y: femalePercent,count:dataSet.female_count  },
   ]
  

		this.pieChartOptions = {

      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        style:{
          height:480,
          width:200,
          // direction: 'rtl',
          textAlign:'right'
        //  fontSize:'0px'
        }
    },
    title: {
        text: ' ',
        
    },
    tooltip: {
        pointFormat: '<strong> {point.name} : {point.count}</strong> نفر',
        style:{
          fontSize:'12px',
          fontFamily:'IRANSans',
          textAlign:'center',
          padding:'4px',
         
        }
        
    },
    // accessibility: {
    //     point: {
    //         valueSuffix: '%'
    //     }
    // },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: pieColors,
            dataLabels: {
                enabled: true,
                format:'<strong>{point.name}</strong><br/>{point.percentage:.1f}%</b>', 
                distance: -50,
                
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                },
                style:{
                  fontSize:'15px',
                  fontFamily:'IRANSans',
                  textAlign:'center',
                  padding:'4px',
                 
                }
            }
        }
    },
    series: [{
      type: 'pie',
        data: dataPie
    }],
  //   responsive: {
  //     rules: [{
  //         condition: {
  //             maxWidth: 990,
           
  //         },
          
    
     
  
  //         chartOptions: {
  //           legend: {
  //               align: 'center',
  //               verticalAlign: 'bottom',
  //               layout: 'horizontal',
                
  //           },
  //           yAxis: {
  //               labels: {
  //                   align: 'left',
  //                   x: 0,
  //                   y: -5
  //               },
  //               title: {
  //                   text: null
  //               }
  //           },
  //           subtitle: {
  //               text: null
  //           },
  //           credits: {
  //               enabled: false,
                
  //       style:{
  //         height:480,
  //         width:200,
  //         // direction: 'rtl',
  //         textAlign:'right'
  //       //  fontSize:'0px'
  //       }
  //           },
            
  //       }
         
  //     }]
  // }

    }
		// this.pieChartOptions = {
		// 	chart: {
		// 		type: 'pie',
		// 	},
		// 	title: {
		// 		text: '',
		// 	},
		// 	tooltip: {
		// 		pointFormat:
		// 			'<strong>{point.name}</strong>:{point.percentage:.1f}%</b>',
		// 	},
		// 	accessibility: {
		// 		point: {
		// 			valueSuffix: '%',
		// 		},
		// 	},
		// 	plotOptions: {
		// 		pie: {
		// 			allowPointSelect: true,
		// 			cursor: 'pointer',
		// 			dataLabels: {
		// 				enabled: true,
		// 				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		// 			},
		// 		},
		// 	},
		// 	series: [
		// 		{
		// 			data: dataSet,
		// 			type: 'pie',
		// 		},
		// 	],
		// };

		// this.chartSHow = false;
		// this.pichartSHow = true;
    setTimeout(() => {
      
      this.plotShow=true
    }, 500);
	}
 

	async getData() {
		// await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpGet('employerDashboard/getCounts').subscribe(
			async (res: any) => {
				console.log(res);
				console.log(res.employee_separately_count);
				this.data = res.employee_separately_count;
				this.setPieChart(this.data);
				// this.data = new dashboard().deserialize(res);

				// await this.global.dismisLoading();
			},
			async (error: any) => {
				// await this.global.dismisLoading();
				this.global.showError(error);
			}
		);
	}
}
