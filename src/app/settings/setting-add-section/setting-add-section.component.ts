import { DataSets } from 'src/app/core/models/StaticData.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/core/models/post.model';
import { SeoService } from 'src/app/core/services/seo.service';
import { UserType } from 'src/app/core/models/user.model';
import { error } from 'src/app/core/models/other.models';

@Component({
	selector: 'app-setting-add-section',
	templateUrl: './setting-add-section.component.html',
	styleUrls: ['./setting-add-section.component.scss'],
})
export class SettingAddSectionComponent implements OnInit {
	pageTitle: string = 'انتخاب پست جدید برای افزودن قرارداد ';
	addForm: FormGroup;
	limit: number = 100;
	offset: number = 0;
	total: number = 0;
	loading = false;
	end: boolean = false;
	// searchVal : string;
	ticketTypeObj:any={}

	dataList: UserType[] = [];
	sections: FormArray;
	// api:any={

	// 	"sections" : [
	
	// 		{
	
	// 			"section_id" : "1",
	
	// 			"section_type" : "contract_definition_section" 
	
	// 		},
	
	// 		{
	
	// 			"section_id" : "2",
	
	// 			"section_type" : "payroll_definition_section" 
	
	// 		},
	
	// 		{
	
	// 			"section_id" : "3",
	
	// 			"section_type" : "settlement_definition_section" 
	
	// 		}
	
	// 	]    
	
	// }

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController
	) {
		this.addForm = this.fb.group({
			// section_id: ['', Validators.compose([Validators.required])],
			// section_type: ['', Validators.compose([Validators.required])],
			sections: this.fb.array([]),

		});
		this.sections = this.addForm.get(
			'sections'
		) as FormArray;
	}

	async ngOnInit() {
		this.ticketTypeObj= new Object();
		await this.global.baseData.subscribe(value => {
			if (value) {
				console.log(value.definition_section_type);
				 value.definition_section_type.map((item:{value:string,name:string})=>{
					// console.log(item.value);
					// console.log( Object.create({}, { p: { value: item.value } }));
					this.ticketTypeObj[item.value]=item.name
				})
			
				console.log(this.ticketTypeObj);
			}
		});
		
	}
	

	// 
	get payrollAdditionsGroup(): FormArray {
		return this.addForm.get('sections') as FormArray;
	}
	newPayrollAdditions(sections:any): FormGroup {
		// // console.log(sections);
		// const form = this.fb.group({});
		// sections.map((addition:any) => {
		// 	console.log(addition.en_name);
		// 	console.log(addition.section_id);
			
		// 	if (addition.en_name) {
		// 		form.addControl(
		// 			addition.en_name,
		// 			this.fb.control(
		// 				addition.section_id,
						
		// 				[Validators.required] 
		// 			)

		// 			// this.fb.control('')
		// 			// this.fb.control('', [Validators.required])
		// 		);
		// 	}
		// });

		// console.log(form);
		// return form;
		return this.fb.group({
			section_type: [sections?.section_type, Validators.compose([Validators.required])],
			section_id: [Number(sections?.section_id) , Validators.compose([Validators.required])],
		}) ;
	}

	async getData() {
		if (this.dataList.length > 0 && this.end) {
			return;
		}
		this.loading = true;
		this.global
			.httpPost('user/role/list', {
				limit: this.limit,
				offset: this.offset,
			})
			.subscribe(
				async (res: any) => {
				
					
					console.log(res);
					this.total = res.totalRows;
					this.loading = false;
					if (res.list.length < this.limit) {
						this.end = true;
					}
					this.offset = this.offset + this.limit;

					const data = res.list.map((item: any) => {
						return new UserType().deserialize(item);
						// this.dataList.push(data);
					});
					this.dataList = this.dataList.concat(data);
					// this.dataList.concat(data);
					console.log(this.dataList);
				},
				async (error: any) => {
					this.loading = false;
					this.global.showError(error);
				}
			);
	}

	onScrollToEnd() {
		// console.log('onScroll');
		this.end = true;
		// this.getData();
	}

	onScroll({ end }: any) {
		// console.log(end + this.limit, this.dataList.length)
		if (this.loading || this.total <= this.dataList.length) {
			// console.log('end 1');
			return;
		}

		if (end + this.limit >= this.dataList.length) {
			// console.log('end 2');
			this.getData();
		}
	}

	// searchFun(event:any){
	// 	this.searchVal = event.term;
	// 	this.loading = true;
	// 	this.offset = 0;
	// 	this.end = false;
	// 	this.getData();
	// }

async	ionViewWillEnter() {
		this.setTitle();
		await this.getData();
		await this.global.showLoading()
		this.global
			.httpGet('setting/getDefinitionSections')
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading()
					console.log(res);
				if (res) {
					console.log(res);
					res.sections.map((item:any)=>{
						
						
						this.sections.push(this.newPayrollAdditions(item))

					})
					// this.addForm.patchValue(res)
						// .get('section_id')
						// .setValue(Number(res.section_id));
				}
				},
				async (error: any) => {
				
					await this.global.dismisLoading()
				}
			);
	}
	ionViewDidLeave(){
		this.remove()
		this.remove()
	}
	remove(){
		// this.sections=new FormArray([])
		for (let index = 0; index <this.sections.length; index++) {
			this.sections.removeAt(index);

		}

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
		console.log(this.addForm.value);
		// console.log(this.dataList.find((item)=>{return item.id==this.addForm.value.section_id}).name);
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost(
					'setting/setDefinitionSections',
					this.addForm.value
				)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						
						this.global.showToast(
							'بخش های مربوطه با موفقیت ثبت شد',
								1700,
								'top',
								'success',
								'ios'
						);
						this.navCtrl.navigateForward('/')
						this.addForm.reset();
						
					},
					async (error: any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
	}
}
