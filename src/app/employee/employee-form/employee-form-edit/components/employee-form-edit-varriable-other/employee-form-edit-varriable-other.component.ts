import { PickerController } from '@ionic/angular';
import { DataSets } from 'src/app/core/models/StaticData.model';
import { formTemplateVariable } from './../../../../../core/models/form-template.model';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-form-edit-varriable-other',
  templateUrl: './employee-form-edit-varriable-other.component.html',
  styleUrls: ['./employee-form-edit-varriable-other.component.scss'],
})
export class EmployeeFormEditVarriableOtherComponent implements OnInit,OnChanges {
  @Input('formTemplateVariableList') formTemplateVariableList:formTemplateVariable[]
  @Output() variableValues = new EventEmitter<Array<object>>();
  @Output() goBack = new EventEmitter<boolean>();

  varriableForm:FormGroup
  variable_values: FormArray;
  yearsList!: DataSets[];
	monthList!: Array<{
		name: string;
		number: number;
	}>;
  date:any
  hoursOptions:{value:number,text:string}[]=[]
  minutesOptions:{value:number,text:string}[]=[]
  constructor(
		public global: GlobalService,
		private fb: FormBuilder,
    private pickerCtrl: PickerController

		// private seo: SeoService,
		// private navCtrl: NavController
	) {
		this.varriableForm = this.fb.group({

			variable_values: this.fb.array([]),
		});
		
		this.variable_values = this.varriableForm.get(
			'variable_values'
		) as FormArray;
	}


async  ngOnInit() {
    await this.global.baseData.subscribe((value) => {
      if (value) {
        this.yearsList = value.years;
      }
    });
    this.monthList = this.global.monthList;
    this.makeOptionsPicker()
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(changes.formTemplateVariableList.currentValue      );
    this.variable_values.push(this.newPariableValues(changes.formTemplateVariableList.currentValue))
    // this.getData(changes.businessId.currentValue)
    // changes.formTemplateVariableList.currentValue.map((item:formTemplateVariable[],index:number)=>{
    //   this.variable_values.push(this.newPariableValues(item))
    // })
	changes.formTemplateVariableList.currentValue.map((item:formTemplateVariable)=>{
		console.log(item.input_type);
		if (item.input_type=='hour_minute'&&item?.value) {
			this.date=item?.value?.split(':')[0]+' ساعت و '+item?.value?.split(':')[1]+' دقیقه '

		}
	})
  
  }


  get variableValuesGroup(): FormArray {
		return this.varriableForm.get('variable_values') as FormArray;
	}
  
	newPariableValues(templateVariables: formTemplateVariable[]): FormGroup {
		// console.log(deductions);
		const form = this.fb.group({});
		templateVariables.map((templateVariable: formTemplateVariable) => {
			// console.log(templateVariable.en_name);
			if (templateVariable.variable) {
				form.addControl(
					templateVariable?.variable,
					this.fb.control(
						templateVariable.value,
						templateVariable.isRequired ? [Validators.required] : []
					)
					// this.fb.control('', [Validators.required])
				);
			}
		});

		// console.log(form);
		return form;
	}
  onSubmitVariable() {
    this.varriableForm.markAllAsTouched()
    if (this.varriableForm.valid) {
      
      this.variableValues.emit(this.variableValuesGroup.value);
    }
    // console.log(this.variableValuesGroup.value);

  }
  emitGoBack() {
    
    // this.varriableForm.reset()
      
      this.goBack.emit(true);
    // console.log(this.variableValuesGroup.value);

  }

  // 
  async openPicker(item:any) {
		const picker = await this.pickerCtrl.create({
		  columns: [
			{
			  name: 'hours',
			  options:this.hoursOptions
			},
			{
			  name: 'minutes',
			  options: this.minutesOptions
			},
			
		  ],
		  buttons: [
			{
			  text: 'انصراف',
			  role: 'cancel',
			},
			{
			  text: 'تایید',
			  handler: (value) => {
          console.log(this.formTemplateVariableList.find(x=>x.input_type=='hour_minute').variable);
          const variable=this.formTemplateVariableList?.find(x=>x.input_type=='hour_minute')?.variable
				const val=value.hours.value+':'+value.minutes.value
				console.log(value);
				console.log(val);
				item.get(variable).setValue(val)
				this.date=value.hours.value+' ساعت و '+value.minutes.value+' دقیقه '
				// window.alert(`You selected a ${value.crust.text} pizza with ${value.meat.text} and ${value.veggies.text}`);
			  },
			},
		  ],
		  htmlAttributes: { dir: 'rtl'},
		  cssClass:'add-leave-picker',
		});
	
		await picker.present();
	  }
	  makeOptionsPicker(){
		for (let i = 0; i <= 200; i++) {
			this.hoursOptions.push({value:i,text:` ${i} ساعت   `})
			
		}
		for (let i = 0; i < 60; i++) {
			this.minutesOptions.push({value:i,text: i+' دقیقه '})
			
		}
		console.log(this.hoursOptions);
		console.log(this.minutesOptions);

	  }


}
