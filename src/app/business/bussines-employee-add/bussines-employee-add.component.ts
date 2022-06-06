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
	guarantors: FormArray;
	cheques: FormArray;
	promissory_notes: FormArray;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		public route: ActivatedRoute,

	) {
		this.addForm = this.fb.group({
			business_id: [this.route.snapshot.paramMap.get('id'), Validators.compose([Validators.required ])],
			employee_id: ['', Validators.compose([Validators.required ])],
			specialty: ['', Validators.compose([Validators.required])],
			net_income: ['', Validators.compose([Validators.required ])],
			work_hours_in_day: ['', Validators.compose([Validators.required ])],
			work_hours_in_night: [''],
			work_place: ['', Validators.compose([Validators.required ])],
			has_insurance: [false, Validators.compose([Validators.required ])],
			posts: this.fb.array([this.newPosts(true)]),
			guarantors: this.fb.array([]),
			cheques: this.fb.array([]),
			promissory_notes : this.fb.array([]),
		});

		this.posts = this.addForm.get('posts') as FormArray;
		this.guarantors = this.addForm.get('guarantors') as FormArray;
		this.cheques = this.addForm.get('cheques') as FormArray;
		this.promissory_notes = this.addForm.get('promissory_notes') as FormArray;
		this.businessId = this.route.snapshot.paramMap.get('id');
	}

	// posts
	get postsFormGroup(): FormArray {
		return this.addForm.get('posts') as FormArray;
	}

	newPosts(isTrue : boolean): FormGroup {
		return this.fb.group({
			post_id: ['', Validators.compose([Validators.required])],
			is_default: [isTrue],
		})
	}

	addAnotherPost(){
		this.posts.push(this.newPosts(false));
	}

	removePost(index:number){
		this.global.showAlert('حذف پست',
		'آیا برای حذف پست اطمینان دارید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					this.posts.removeAt(index);
				}
			});
		});
	}
	// guarantors
	get guarantorsFormGroup(): FormArray {
		return this.addForm.get('guarantors') as FormArray;
	}

	newGuarantors(): FormGroup {
		return this.fb.group({
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			national_code: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
			mobile: ['', Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])],
		})
	}

	addAnotherGuarantors(){
		this.guarantors.push(this.newGuarantors());
	}

	removeGuarantors(index : number){
		this.global.showAlert('حذف ضامن',
		'آیا برای حذف ضامن اطمینان دارید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					this.guarantors.removeAt(index);
				}
			});
		});
	}
	// cheques
	get chequesFormGroup(): FormArray {
		return this.addForm.get('cheques') as FormArray;
	}

	newCheques(): FormGroup {
		return this.fb.group({
			number: ['', Validators.compose([Validators.required])],
			amount: ['', Validators.compose([Validators.required])],
		})
	}

	addAnotherCheques(){
		this.cheques.push(this.newCheques());
	}

	removeCheques(index:number){
		this.global.showAlert('حذف چک',
		'آیا برای حذف چک اطمینان دارید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					this.cheques.removeAt(index);
				}
			});
		});
	}

	// cheques
	get promissorynotesFormGroup(): FormArray {
		return this.addForm.get('promissory_notes') as FormArray;
	}

	newPromissoryNotes(): FormGroup {
		return this.fb.group({
			number: ['', Validators.compose([Validators.required])],
			amount: ['', Validators.compose([Validators.required])],
		})
	}

	addAnotherPromissoryNotes(){
		this.promissory_notes.push(this.newPromissoryNotes());
	}

	removePromissoryNotes(index:number){
		this.global.showAlert('حذف سفته',
		'آیا برای حذف سفته اطمینان دارید ؟ ',
		[
			{
				text: 'خیر',
				role: 'cancel'
			},
			{
				text: 'بلی',
				role: 'yes'
			}
		]).then((alert) => {
			alert.present();
			alert.onDidDismiss().then(async (e: any) => {
				if (e.role === 'yes') {
					this.promissory_notes.removeAt(index);
				}
			});
		});
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



}
