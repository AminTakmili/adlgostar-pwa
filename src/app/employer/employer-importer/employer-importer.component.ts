import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { globalData } from 'src/app/core/data/global.data'
import { citiesClass } from 'src/app/core/classes/cities.class';
import { businessClass } from 'src/app/core/classes/business.class';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from 'src/app/core/services/seo.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-employer-importer',
  templateUrl: './employer-importer.component.html',
  styleUrls: ['./employer-importer.component.scss'],
})
export class EmployerImporterComponent implements OnInit {

	disable = true;
	employerList: any;
	employer = this.global.user.id;
	businessAddress: any = [1]
	pageTitle: string = "افزودن کارفرما با اکسل";
	addresses: FormArray;
	////////////////////
	personType = globalData.personType;
	province: citiesClass[] = [];
	businessCatgeories: businessClass[] = [];
	addForm: FormGroup;

	categoryLimit = 1000;
	categoryoffSet = 0;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private cd: ChangeDetectorRef,
	) {
		this.addForm = this.fb.group({
			file: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {
		this.setTitle();
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

		if (this.addForm.valid) {
			var formData: any = new FormData();
   			formData.append("file", this.addForm.get('file').value);

			   await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('employer/import', formData)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/employer');
					this.addForm.reset();
					this.global.showToast(' کارفرماها با موفقیت ثبت شدند .');
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	uploadFile(event: any) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.addForm.patchValue({
					file: reader.result
				});

				this.cd.markForCheck();
			};
		}
	}

}
