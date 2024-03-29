import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-payroll-deduction-add',
  templateUrl: './payroll-deduction-add.component.html',
  styleUrls: ['./payroll-deduction-add.component.scss'],
})
export class PayrollDeductionAddComponent implements OnInit {

  pageTitle: string = "افزودن  کسورات حقوق و دستمزد";
	addForm : FormGroup ;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl : NavController
	) {
		this.addForm = this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			calc_in_payroll_received:[false]
		});
	}

	ngOnInit() {
		this.setTitle()
	 }

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	async onSubmit() {

		// console.log(this.extraSalary.value);
		// return ;
		this.addForm.markAllAsTouched();
		if(this.addForm.valid){
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('payrollDeduction/add', this.addForm.value )
			.subscribe(async (res:any) => {

				await this.global.dismisLoading();
				// console.log(res:any);
        this.navCtrl.navigateForward(
          'payrolls/payroll_base_info/payroll_deduction/list'
        );
        this.global.showToast('کسر حقوق و دستمزد با نام '+ this.addForm.value.name +' ثبت شد .',1000,'top','success','ios');
				this.addForm.reset();
			}, async (error:any) => {
				await this.global.dismisLoading();
				this.global.showError(error);
			});
		}
	}


}
