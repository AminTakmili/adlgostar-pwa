import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ValidationErrors, FormControl, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-validator',
	templateUrl: './validator.component.html',
	styleUrls: ['./validator.component.scss'],
})
export class ValidatorComponent implements OnInit {

	@Input() controlName: string;
	@Input() control !: any;

	@ViewChild('text' , { static: false })  text : ElementRef;
	@Output() validationTxt = new EventEmitter<string>();
	// @Input() control !: AbstractControl;

	config : any = {};

	get errorText() {

		if(this.control?.errors){
			 const error = this.chkError(this.control?.errors);
			 this.validationTxt.emit(error);
			 return error;
		}else{
			return '';
		}

	}

	param = '';

	constructor() { }

	ngOnInit() {
		this.config = {
			required: `${this.controlName} ضروری است.`,
			minlength: `${this.controlName} حداقل باید دارای %p کاراکتر باشد.`,
			maxlength: `${this.controlName} حداکثر باید دارای %p کاراکتر باشد.`,
			email: `${this.controlName}  معتیر نمی باشد .`,
			notSame : `${this.controlName}  با کلمه عبور یکسان نیستند .`,
			min :  `${this.controlName} حداقل باید %p  باشد.`,
			max :  `${this.controlName} حداکثر باید %p  باشد.`,
			pattern :  `${this.controlName} باید مطابق الگو مناسب باشد.`,
		};
	}

	chkError(errors: ValidationErrors) {
		if (this.control.touched || this.control.dirty) {
			if (errors !== null) {
				// tslint:disable-next-line: forin
				for (const error in errors) {
					switch (error) {
						case 'minlength':
							this.param = this.control.errors['minlength'].requiredLength.toString();
							break;
						case 'maxlength':
							this.param = this.control.errors['maxlength'].requiredLength.toString();
							break;
							case 'min':
							
								this.param = this.control.errors['min'].min.toString();
								break;
							case 'max':
								this.param = this.control.errors['max'].max.toString();
								break;
						default:
							this.param = '';
							break;
					}
					if (this.config[error] !== undefined) {
						return this.config[error].replace('%p', this.param);
					} else {
						return '';
					}
				}
			} else {
				return '';
			}
		}else{
			return '';
		}
	}


}
