import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Employee } from 'src/app/core/models/employee.model';
import { Post } from 'src/app/core/models/post.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-bussines-employee-add',
  templateUrl: './bussines-employee-add.component.html',
  styleUrls: ['./bussines-employee-add.component.scss'],
})
export class BussinesEmployeeAddComponent implements OnInit {

	pageTitle: string = "ثبت کارمند جدید به کسب کار";
	addForm: FormGroup;
	employeelist: Employee[];
	postList: Post[];
	businessId : string;

	posts: FormArray;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,

	) {
		this.addForm = this.fb.group({
			business_id: [this.route.snapshot.paramMap.get('id'), Validators.compose([Validators.required ])],
			employee_id: ['', Validators.compose([Validators.required ])],
			specialty: [''],
			net_income: ['', Validators.compose([Validators.required ])],
			work_hours: ['', Validators.compose([Validators.required ])],
			work_place: ['', Validators.compose([Validators.required ])],
			has_insurance: [false, Validators.compose([Validators.required ])],
			posts: this.fb.array([this.newPosts(true)]),
		});

		this.posts = this.addForm.get('posts') as FormArray;
		this.businessId = this.route.snapshot.paramMap.get('id');
	}

	get postsFormGroup(): FormArray {
		return this.addForm.get('posts') as FormArray;
	}

	newPosts(isTrue : boolean): FormGroup {
		return this.fb.group({
			post_id: [''],
			is_default: [isTrue],
		})
	}

	ngOnInit() {
		this.setTitle();
	}

	ionViewWillEnter() {
		this.getData();
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	getData(){

		const employees = this.global.httpPost('employee/filteredList', { for_combo:true , limit: 1000, offset: 0 });
		const posts = this.global.httpPost('post/list', { limit: 1000, offset: 0 });
		this.global.parallelRequest([employees , posts])
			.subscribe(([employeesRes , postsRes = '' ]) => {
				this.employeesSet(employeesRes);
				this.postsSet(postsRes);
			});
	}

	employeesSet(data : any){
		this.employeelist = data.list.map((item: any) => {
			return new Employee().deserialize(item);
		});
	}
	postsSet(data : any){
		this.postList = data.list.map((item: any) => {
			return new Post().deserialize(item);
		});
	}
	async onSubmit(AddAnOther : boolean = false) {
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('business/employee/add', this.addForm.value)
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					if(!AddAnOther){
						this.navCtrl.navigateForward('/businesses/detail/'+this.businessId);
					}
					this.global.showToast('کارمند با موفقیت اضافه شد');
					this.addForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	addAnother(){
		this.posts.push(this.newPosts(false));
	}

}
