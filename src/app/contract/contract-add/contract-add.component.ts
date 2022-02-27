import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';
import { CKEditorComponent } from 'ng2-ckeditor';


@Component({
	selector: 'app-contract-add',
	templateUrl: './contract-add.component.html',
	styleUrls: ['./contract-add.component.scss'],
})
export class ContractAddComponent implements OnInit {

	pageTitle: string = "افزودن قرار داد";
	contractsForm: FormGroup;
	@ViewChild("myckeditor") ckeditor: CKEditorComponent;
	ckeConfig: CKEDITOR.config;
	step : number = 1;
	// public Editor = ClassicEditor;

	editors = ['Classic', 'Inline'];
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		this.contractsForm = this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			employer_id: ['', Validators.compose([Validators.required])],
			employee_id: ['', Validators.compose([Validators.required])],
			contractTheme: ['سلام', Validators.compose([Validators.required])],
			contract: ['سلام', Validators.compose([Validators.required])],
			termesContratId: ['سلام', Validators.compose([Validators.required])],
			termesContrat: ['سلام', Validators.compose([Validators.required])],
			selectedDateFormControl: ['', Validators.compose([Validators.required])],
		})
	}

	ngOnInit() {
		this.setTitle();
		this.ckeConfig = {
			allowedContent: false,
			extraPlugins: 'divarea',
			forcePasteAsPlainText: true,
			removePlugins: 'exportpdf',
			language: "fa",
			font_defaultLabel : 'IRANSans'
		  };
	}

	setTitle() {
		this.seo.generateTags({
			title: 'افزودن قرار داد جدید',
			description: 'قرار داد جدی ',
			keywords: "قرار داد جدی",
			isNoIndex: false,
		});
	}

	onSubmit() {

	}


}
