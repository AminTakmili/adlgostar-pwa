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
  selector: 'app-employee-form-edit-varriable-loan-installment',
  templateUrl: './employee-form-edit-varriable-loan-installment.component.html',
  styleUrls: ['./employee-form-edit-varriable-loan-installment.component.scss'],
})
export class EmployeeFormEditVarriableLoanInstallmentComponent implements OnInit,OnChanges {
  @Input('formTemplateVariableList') formTemplateVariableList:any[]

	@Input('businessEmployeeId') businessEmployeeId: string;
	@Input('business_employee_form_id') business_employee_form_id: number;
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
installment_num:number
defultObj:any={}
  
	constructor(public global: GlobalService, private fb: FormBuilder) {
		this.loanForm = this.fb.group({
		
			business_employee_form_id: [, Validators.compose([Validators.required])],
   
		});
	}
	ngOnChanges(changes: SimpleChanges) {
		// console.log(changes);
		// console.log(changes.businessEmployeeId.currentValue);
  
this.defultObj['installment_num']=this.formTemplateVariableList?.find((x:any)=>x.variable=="installment_num")?.value
this.defultObj['installment_amount']=this.formTemplateVariableList?.find((x:any)=>x.variable=="installment_amount")?.value
this.defultObj['year']=this.formTemplateVariableList?.find((x:any)=>x.variable=="year")?.value
this.defultObj['month']=this.formTemplateVariableList?.find((x:any)=>x.variable=="month")?.value
    console.log(this.formTemplateVariableList);
    console.log('defultObj,',this.defultObj);
		this.getRemainingLoanReceivedList(
			changes.businessEmployeeId.currentValue
		);
    if(changes.business_employee_form_id.currentValue){
      this.loanForm.get('business_employee_form_id').setValue(changes.business_employee_form_id.currentValue)
    }
    this.installment_num=this.formTemplateVariableList?.find((x:any)=>x.variable=="installment_num")?.value
    console.log(this.formTemplateVariableList?.find((x:any)=>x.variable=="installment_num"));
    console.log(this.installment_num);
   
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
          if (this.business_employee_form_id) {
            this.getRemainingLoanInstallmentList()
          }
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
          let domy
          if (this.business_employee_form_id) {
            domy=[this.defultObj,...res]
          }else{
            domy=res
          }
       console.log(domy);
					this.remainingLoanInstallmentList = domy.map(
						(remainingLoan: remainingLoanInstallment) => {
							return new remainingLoanInstallment().deserialize(
								remainingLoan
							);
						}
					);
          if (	this.remainingLoanInstallmentList&&	this.remainingLoanInstallmentList.length&&this.installment_num&&this.business_employee_form_id) {
            let baceObj:any=this.remainingLoanInstallmentList.find((x:any)=>x.installment_num==this.installment_num)
            baceObj['business_employee_form_id']=this.business_employee_form_id
            this.passArray= [baceObj]
            
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
