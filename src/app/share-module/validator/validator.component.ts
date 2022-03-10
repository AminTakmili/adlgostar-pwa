import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidationErrors, FormControl, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-validator',
	templateUrl: './validator.component.html',
	styleUrls: ['./validator.component.scss'],
})
export class ValidatorComponent implements OnInit {

	@Input() controlName: string;

	@Input() control !: any;
	// @Input() control !: AbstractControl;

	config : any = {};

	get errorText() {
		return this.chkError(this.control.errors);
	}

	param = '';

	constructor() { }

	ngOnInit() {
		this.config = {
			required: `${this.controlName} ضروری است.`,
			minlength: `${this.controlName} حداقل باید دارای %p کاراکتر باشد.`,
			maxlength: `${this.controlName} حداکثر باید دارای %p کاراکتر باشد.`,
			email: `${this.controlName}  معتیر نمی باشد .`,
			notSame : `${this.controlName}  با کلمه عبور یکسان نیستند .`
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
		}
	}


}
