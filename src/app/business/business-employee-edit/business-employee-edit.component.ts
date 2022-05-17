import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Employee } from 'src/app/core/models/employee.model';
import { Post } from 'src/app/core/models/post.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
	selector: 'app-business-employee-edit',
	templateUrl: './business-employee-edit.component.html',
	styleUrls: ['./business-employee-edit.component.scss'],
})
export class BusinessEmployeeEditComponent implements OnInit {

	pageTitle: string = "ویرایش اطلاعات کارمند در کسب و کار";
	editForm: FormGroup;
	employeelist: Employee[];
	postList: Post[];
	businessId: string;

	posts: FormArray ;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,

	) {
		this.editForm = this.fb.group({
			business_employee_id: [this.route.snapshot.paramMap.get('id')],
			business_id: [],
			employee_id: ['', Validators.compose([Validators.required])],
			specialty: [''],
			net_income: ['', Validators.compose([Validators.required])],
			work_hours: ['', Validators.compose([Validators.required])],
			work_place: ['', Validators.compose([Validators.required])],
			has_insurance: [false, Validators.compose([Validators.required])],
			posts: this.fb.array([]),
		});

		this.posts = this.editForm.get('posts') as FormArray;


		this.businessId = this.route.snapshot.paramMap.get('id');

	}

	get postsFormGroup(): FormArray {
		return this.editForm.get('posts') as FormArray;
	}

	newPosts(isTrue: boolean): FormGroup {
		return this.fb.group({
			post_id: [''],
			is_default: [isTrue],
		})
	}
	exsistPosts(isTrue: boolean,postId :number): FormGroup {
		return this.fb.group({
			post_id: [postId],
			is_default: [isTrue],
		})
	}

	ngOnInit() {
		this.setTitle();
	}

	ionViewWillEnter() {
		this.getData();
		this.getEmployeeData(this.route.snapshot.paramMap.get('id'));
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	async getEmployeeData(businessEmployeeId: string) {
		//business/employee/add
		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('business/employee/detail', {
			business_employee_id: businessEmployeeId
		}).subscribe(async (res: any) => {

			await this.global.dismisLoading();
			this.businessId = res.business_id ;
			this.editForm.get('business_id').setValue(res.business_id);
			this.editForm.get('employee_id').setValue(res.employee_id);
			this.editForm.get('specialty').setValue(res.specialty);
			this.editForm.get('net_income').setValue(res.net_income);
			this.editForm.get('work_hours').setValue(res.work_hours);
			this.editForm.get('work_place').setValue(res.work_place);
			this.editForm.get('has_insurance').setValue(res.has_insurance);

			if(res.posts && res.posts.length){
				res.posts.map((item : any,index : number)=>{
					this.posts.push(
						this.exsistPosts(
							( index===0 ? true : false) ,
							item.id,
						)
					);
				})
			}else{
				this.posts.push(this.newPosts(true));
			}

			console.log(this.posts);
		}, async (error: any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});

	}

	getData() {

		const employees = this.global.httpPost('employee/filteredList', { for_combo: true, limit: 1000, offset: 0 });
		const posts = this.global.httpPost('post/list', { limit: 1000, offset: 0 });
		this.global.parallelRequest([employees, posts])
			.subscribe(([employeesRes, postsRes = '']) => {
				this.employeesSet(employeesRes);
				this.postsSet(postsRes);
			});
	}

	employeesSet(data: any) {
		this.employeelist = data.list.map((item: any) => {
			return new Employee().deserialize(item);
		});
	}
	postsSet(data: any) {
		this.postList = data.list.map((item: any) => {
			return new Post().deserialize(item);
		});
	}
	async onSubmit() {
		this.editForm.markAllAsTouched();
		if (this.editForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('business/employee/edit', this.editForm.value)
				.subscribe(async (res: any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/businesses/detail/' + this.businessId);
					this.global.showToast('کارمند با موفقیت ویرایش شد');
					this.editForm.reset();
				}, async (error: any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	addAnother() {
		this.posts.push(this.newPosts(false));
	}

}
