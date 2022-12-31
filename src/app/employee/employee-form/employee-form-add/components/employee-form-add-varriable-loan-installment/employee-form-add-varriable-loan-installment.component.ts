import { remainingLoanReceived, remainingLoanInstallment } from './../../../../../core/models/form.model';
import { GlobalService } from './../../../../../core/services/global.service';
import { DataSets } from './../../../../../core/models/StaticData.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
	Component,
	Input,
	OnInit,
	OnChanges,
	SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
	selector: 'app-employee-form-add-varriable-loan-installment',
	templateUrl:
		'./employee-form-add-varriable-loan-installment.component.html',
	styleUrls: [
		'./employee-form-add-varriable-loan-installment.component.scss',
	],
})
export class EmployeeFormAddVarriableLoanInstallmentComponent
	implements OnInit, OnChanges
{
	@Input('businessEmployeeId') businessEmployeeId: string;
	loanForm: FormGroup;
	remainingLoanReceivedList: remainingLoanReceived[];
	remainingLoanInstallmentList: remainingLoanInstallment[];
  @Output() variableValues = new EventEmitter<Array<object>>();
  @Output() goBack = new EventEmitter<boolean>();

	yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;
  passArray:[remainingLoanInstallment]

	constructor(public global: GlobalService, private fb: FormBuilder) {
		this.loanForm = this.fb.group({
		
			business_employee_form_id: [, Validators.compose([Validators.required])],
   
		});
	}
	ngOnChanges(changes: SimpleChanges) {
		// console.log(changes);
		// console.log(changes.businessEmployeeId.currentValue);
		this.getRemainingLoanReceivedList(
			changes.businessEmployeeId.currentValue
		);
   
	}

	async ngOnInit() {
		// this.setTitle();
		await this.global.baseData.subscribe((value) => {
			if (value) {
				this.yearsList = value.years;
			}
		});
		this.monthList = this.global.monthList;
	}
	async getRemainingLoanReceivedList(
		business_employee_id: string = this.businessEmployeeId
	) {
		await this.global.showLoading();
		this.global
			.httpPost('businessEmployee/form/getRemainingLoanReceivedList', {
				business_employee_id,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(res);
					this.remainingLoanReceivedList = res.map(
						(remainingLoan: remainingLoanReceived) => {
							return new remainingLoanReceived().deserialize(
								remainingLoan
							);
						}
					);
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}
	async getRemainingLoanInstallmentList(
	) {
		await this.global.showLoading();
		this.global
			.httpPost('businessEmployee/form/getRemainingLoanInstallmentList', {
				business_employee_id:this.businessEmployeeId,
        business_employee_form_id:this.loanForm.get('business_employee_form_id').value
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.log(res);
       
					this.remainingLoanInstallmentList = res.map(
						(remainingLoan: remainingLoanInstallment) => {
							return new remainingLoanInstallment().deserialize(
								remainingLoan
							);
						}
					);
          if (	this.remainingLoanInstallmentList&&	this.remainingLoanInstallmentList.length) {
            this.passArray= [this.remainingLoanInstallmentList[0]]
            
          }
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				}
			);
	}
  setValue(val:remainingLoanInstallment){
	const domy:any=val
	domy['business_employee_form_id']=this.loanForm.get('business_employee_form_id')?.value
	// console.log(domy);
    this.passArray=[domy]
  }
	async onSubmit() {

   
		this.loanForm.markAllAsTouched();
		if (this.loanForm.valid)
		{
			
      this.variableValues.emit( this.passArray);

			
		}
	}
  emitGoBack() {
    
    // this.varriableForm.reset()
      
      this.goBack.emit(true);
    // console.log(this.variableValuesGroup.value);

  }

}
