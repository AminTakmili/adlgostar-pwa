import { RequestAddPayrollComponent } from './../request-add-payroll/request-add-payroll.component';
import {
	AlertController,
	ModalController,
	NavController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/app/core/models/business.model';
import { Employee } from 'src/app/core/models/employee.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { RequestAddContractComponent } from './../request-add-contract/request-add-contract.component';
import { SeoService } from 'src/app/core/services/seo.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { contract } from 'src/app/core/models/contractConstant.model';
import { payrollInfo } from 'src/app/core/models/payroll-list.model';
import { sortBy } from 'lodash';
import { settlementList } from 'src/app/core/models/settlement.model';
@Component({
	selector: 'app-business-detail',
	templateUrl: './business-detail.component.html',
	styleUrls: ['./business-detail.component.scss'],
})
export class BusinessDetailComponent implements OnInit {
	pageTitle = 'جزییات کسب و کار';
	business: Business;
	businessId!:string;
	businessEmployees: Employee[] = [];
	dataList: contract[];

	limit: number = 10;
	offset: number = 0;
	total: number = 0;
	CurrentPage: number = 1;

	PayrollLimit: number = 12;
	PayrollOffset: number = 0;
	PayrollTotal: number = 0;
	PayrollCurrentPage: number = 1;

	settlementLimit: number = 10;
	settlementOffset: number = 0;
	settlementTotal: number = 0;
	settlementCurrentPage: number = 1;
	settlementdataList:settlementList[] ;




	contractDefinitionSectionId!: number;
	settlementDefinitionSectionId!: number;
	payrollDefinitionSectionId!: number;
	is_employer!: boolean;
	payrollInfoList: payrollInfo[];
	constructor(
		public global: GlobalService,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
		public alertController: AlertController,
		public modalController: ModalController,
		private storage: StorageService
	) {
		this.businessId = this.route.snapshot.paramMap.get('businessId');
	}

	ngOnInit() {}
	async ionViewWillEnter() {
		this.getData();

		this.getPayrollData();
		this.getContractData();
		this.getSettlementData();
		this.storage.get('user').then((val) => {
			if (Object.keys(val).length) {
				console.log(val);
				console.log(val.is_employer);
				this.is_employer = val.is_employer;
			}
		});
	}

	async getData() {
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('business/detail', {
				business_id: this.businessId,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					this.business = new Business().deserialize(res);
					this.businessEmployees = this.business.employees;
					this.setTitle();
					// console.log();
					this.contractDefinitionSectionId =
						this.business.contract_definition_section_id;
					this.payrollDefinitionSectionId =
						this.business.payroll_definition_section_id;
					this.settlementDefinitionSectionId =
						this.business.settlement_definition_section_id;
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	setTitle() {
		this.seo.generateTags({
			title: 'جزییات کسب و کار ' + this.business?.name,
			description: 'ویرایش کسب و کار ',
			keywords: 'ویرایش کسب و کار ',
			isNoIndex: false,
		});
	}

	removeEmployee(id: any) {
		this.global
			.showAlert(
				'حذف کارمند از کسب و کار',
				'آیا برای حذف اطمینان دارید؟',
				[
					{
						text: 'بلی',
						role: 'yes',
					},
					{
						text: 'خیر',
						role: 'cancel',
					},
				]
			)
			.then((alert: any) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('business/employee/delete', {
								business_employee_id: id,
							})
							.subscribe(
								async (res: any) => {
									await this.global.dismisLoading();

									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}

	filterEmployee($event: any) {
		const searchTerm = $event.detail.value;
		console.log(this.businessEmployees);
		this.businessEmployees = this.business.employees.filter((item) => {
			return item.full_name.indexOf(searchTerm) > -1;
			// item.full_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});
	}
	async getContractData(filtered_title?: string) {
		// await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('contract/filteredList', {
				limit: this.limit,
				offset: this.offset,
				filtered_business_id: this.businessId,
				filtered_title,
			})
			.subscribe(
				async (res: any) => {
					// await this.global.dismisLoading();
					this.total = res.totalRows;
					this.dataList = res.list.map((item: any) => {
						return new contract().deserialize(item);
					});
					console.log(this.dataList);
				},
				async (error: any) => {
					// await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}
	async getPayrollData() {
		this.global
			.httpPost('payroll/getBusinessPayrollInfo', {
				business_id: this.businessId,
				limit: this.PayrollLimit,
				offset: this.PayrollOffset,
			})
			.subscribe(
				async (res: any) => {
					console.log(res);
					this.PayrollTotal = res.totalRows;
					this.payrollInfoList = res.list.map((item: payrollInfo) => {
						return new payrollInfo().deserialize(item);
					});
					sortBy(this.payrollInfoList, ['year', 'month']);
				},

				async (error: any) => {
					await this.global.showError(error)
					console.log(error);
				}
			);
	}
	pageChangeContract($event: any) {
		this.CurrentPage = $event;
		this.offset = this.limit * this.CurrentPage - this.limit;
		this.getContractData();
	}
	pageChangePyroll($event: any) {
		this.PayrollCurrentPage = $event;
		this.PayrollOffset = this.PayrollLimit * this.PayrollCurrentPage - this.PayrollLimit;
		this.getPayrollData();
	}
	changeFilterContract(event: any) {
		// console.log(event.detail.value);
		this.CurrentPage = 1;
		this.offset = 0;
		this.getContractData(event.detail.value);
	}

	async removeContractALert(item: contract) {
		const employee: any[] = item.employee_info.map((item) => {
			const input = {
				name: item.full_name,
				type: 'checkbox',
				label: item.full_name,
				value: item.business_employee_id,
				checked: false,
			};
			return input;
		});
		console.log(employee);
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: item.title,
			subHeader: 'حذف قرار داد',
			message: ' حذف افراد از قرار داد' + item.title,
			inputs: employee,
			buttons: [
				{
					text: 'بی خیال',
					role: 'cancel',
					cssClass: 'dark',
					handler: () => {
						console.log('Confirm Cancel');
					},
				},
				{
					text: 'حذف کن',
					cssClass: 'medium',
					handler: (alertData) => {
						this.removeContract(item, alertData);
					},
				},
			],
		});

		await alert.present();
	}

	removeContract(item: contract, data: number[]) {
		this.global
			.showAlert('حذف ' + this.pageTitle, 'آیا برای حذف اطمینان دارید؟', [
				{
					text: 'بلی',
					role: 'yes',
					cssClass: 'dark',
				},
				{
					text: 'خیر',
					role: 'cancel',
					cssClass: 'medium',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('contract/delete', {
								id: item.id,
								is_group_deleting:
									item.employee_info.length === data.length
										? 1
										: 0,
								business_employee_ids: data,
							})
							.subscribe(
								async (res: any) => {
									await this.global.dismisLoading();

									this.offset = 0;
									this.CurrentPage = 1;
									this.getData();

									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}

	removeparollALert(item: payrollInfo) {
		this.global
			.showAlert('حذف فیش حقوقی', 
			`آیا برای حذف فیش حقوقی ${this.global.getMonthName[item.month]} ماه سال ${item.year} برای ${item.count} فیش حقوقی اطمینان دارید؟`, 
				[
				{
					text: 'بلی',
					role: 'yes',
					cssClass: 'dark',
				},
				{
					text: 'خیر',
					role: 'cancel',
					cssClass: 'medium',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpDelete('payroll/deleteBusinessPayrollList', {
								year: item.year,
								month: item.month,
								business_id: this.businessId,
							})
							.subscribe(
								async (res: any) => {
									await this.global.dismisLoading();

									this.offset = 0;
									this.CurrentPage = 1;
									this.getPayrollData()

									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}

	async openAddContractModal() {
		const modal = await this.modalController.create({
			component: RequestAddContractComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			swipeToClose: true,
			componentProps: {
				businessEmployees: this.businessEmployees,
				contractDefinitionSectionId: this.contractDefinitionSectionId,
			},
		});

		return await modal.present();
	}
	async openAddPayrollModal() {
		const modal = await this.modalController.create({
			component: RequestAddPayrollComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			swipeToClose: true,
			componentProps: {
				businessId:this.businessId,
				businessName:this.business?.name,
				payrollDefinitionSectionId: this.payrollDefinitionSectionId,

			},
		});

		return await modal.present();
	}
	confirmedPayrollHour(item: payrollInfo) {
		this.global
			.showAlert('تایید فیش حقوقی' ,			
			 `آیا برای تایید فیش حقوقی ${this.global.getMonthName[item.month]} ماه سال ${item.year} برای ${item.count} فیش حقوقی اطمینان دارید؟`, [
				{
					text: 'بلی',
					role: 'yes',
					cssClass: 'dark',
				},
				{
					text: 'خیر',
					role: 'cancel',
					cssClass: 'medium',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpPost('payroll/confirmBusinessPayrollList', {
								month:item.month,
								year:item.year,
								business_id:this.businessId
							})
							.subscribe(
								
								async (res: any) => {
									await this.global.dismisLoading();
									this.offset = 0;
									this.CurrentPage = 1;
									this.getPayrollData()
									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}


	async getSettlementData() {
		// await this.global.showLoading('لطفا منتظر بمانید...');
		this.global
			.httpPost('settlement/filteredList', {
				limit: this.limit,
				offset: this.offset,
				
				filtered_business_id:	this.businessId ,
      			// filtered_is_confirmed:this.filtered_is_confirmed
			})
			.subscribe(
				async (res: any) => {
					// await this.global.dismisLoading();
					this.settlementTotal = res.totalRows;
					this.settlementdataList = res.list.map((item: settlementList) => {
						return new settlementList().deserialize(item);
					});

					console.log(this.settlementdataList);
				},
				async (error: any) => {
					// await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}

	// changeSettlementFilter() {
	// 	this.settlementCurrentPage = 1;
	// 	this.settlementOffset = 0;
	// 	this.getSettlementData();
	// }
	pageSettlementChange($event: any) {
		this.CurrentPage = $event;
		this.offset = this.limit * this.CurrentPage - this.limit;
		this.getSettlementData();
	}

	confirmedSettlement(item:settlementList ) {
		this.global
			.showAlert('تایید تسویه حساب' ,			
			 `آیا برای تایید تسویه حساب  ${item.employee_name } اطمینان دارید؟`, [
				{
					text: 'بلی',
					role: 'yes',
					cssClass: 'dark',
				},
				{
					text: 'خیر',
					role: 'cancel',
					cssClass: 'medium',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.global
							.httpPost('payroll/confirm', {
								id: item.id,
							})
							.subscribe(
								
								async (res: any) => {
									await this.global.dismisLoading();
									this.settlementOffset = 0;
									this.settlementCurrentPage = 1;
									this.getSettlementData();
									this.global.showToast(res.msg);
								},
								async (error: any) => {
									await this.global.dismisLoading();
									this.global.showError(error);
								}
							);
					}
				});
			});
	}
  async removeSettlementItem(item:settlementList){
		this.global.showAlert('حذف  تسویه حساب',`آیا برای حذف تسویه حساب ${item.employee_name} اطمینان دارید؟`, [
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
					this.global.httpDelete('settlement/delete', {
						id:item.id	,
					}).subscribe(async (res:any) => {

						await this.global.dismisLoading();
						this.global.showToast('تسویه حساب با موفقیت حذف شد')
				this.pageSettlementChange(1) 

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
	}
}
