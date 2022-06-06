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
		this.editForm = this.fb.group({
			business_employee_id: [this.route.snapshot.paramMap.get('id')],
			business_id: [],
			employee_id: ['', Validators.compose([Validators.required])],
			specialty: ['', Validators.compose([Validators.required])],
			net_income: ['', Validators.compose([Validators.required])],
			work_hours_in_day: ['', Validators.compose([Validators.required])],
			work_hours_in_night: [''],
			work_place: ['', Validators.compose([Validators.required])],
			has_insurance: [false, Validators.compose([Validators.required])],
			posts: this.fb.array([]),
			guarantors: this.fb.array([]),
			cheques: this.fb.array([]),
			promissory_notes: this.fb.array([]),

		});

		this.posts = this.editForm.get('posts') as FormArray;
		this.guarantors = this.editForm.get('guarantors') as FormArray;
		this.cheques = this.editForm.get('cheques') as FormArray;
		this.promissory_notes = this.editForm.get('promissory_notes') as FormArray;

		this.businessId = this.route.snapshot.paramMap.get('id');

	}

	get postsFormGroup(): FormArray {
		return this.editForm.get('posts') as FormArray;
	}

	newPosts(isTrue: boolean): FormGroup {
		return this.fb.group({
			post_id: ['', Validators.compose([Validators.required])],
			is_default: [isTrue],
		})
	}

	addAnotherPost() {
		this.posts.push(this.newPosts(false));
	}

	existPosts(isTrue: boolean, postId: number): FormGroup {
		return this.fb.group({
			post_id: [postId, Validators.compose([Validators.required])],
			is_default: [isTrue],
		})
	}

	removePost(index: number) {
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
		return this.editForm.get('guarantors') as FormArray;
	}

	newGuarantors(): FormGroup {
		return this.fb.group({
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			national_code: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
			mobile: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
		})
	}

	existGuarantors(first_name: string, last_name: string, national_code: number, mobile: string): FormGroup {
		return this.fb.group({
			first_name: [first_name, Validators.compose([Validators.required])],
			last_name: [last_name, Validators.compose([Validators.required])],
			national_code: [national_code, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
			mobile: [mobile, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
		})
	}

	addAnotherGuarantors() {
		this.guarantors.push(this.newGuarantors());
	}

	removeGuarantors(index: number) {
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
		return this.editForm.get('cheques') as FormArray;
	}

	newCheques(): FormGroup {
		return this.fb.group({
			number: ['', Validators.compose([Validators.required])],
			amount: ['', Validators.compose([Validators.required])],
		})
	}

	existCheques(number: string, amount: number): FormGroup {
		return this.fb.group({
			number: [number, Validators.compose([Validators.required])],
			amount: [amount, Validators.compose([Validators.required])],
		})
	}

	addAnotherCheques() {
		this.cheques.push(this.newCheques());
	}

	removeCheques(index: number) {
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
		return this.editForm.get('promissory_notes') as FormArray;
	}

	newPromissoryNotes(): FormGroup {
		return this.fb.group({
			number: ['', Validators.compose([Validators.required])],
			amount: ['', Validators.compose([Validators.required])],
		})
	}

	existPromissoryNotes(number: string, amount: number): FormGroup {
		return this.fb.group({
			number: [number, Validators.compose([Validators.required])],
			amount: [amount, Validators.compose([Validators.required])],
		})
	}

	addAnotherPromissoryNotes() {
		this.promissory_notes.push(this.newPromissoryNotes());
	}

	removePromissoryNotes(index: number) {
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


	//

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
			this.businessId = res.business_id;
			this.editForm.get('business_id').setValue(res.business_id);
			this.editForm.get('employee_id').setValue(res.employee_id);
			this.editForm.get('specialty').setValue(res.specialty);
			this.editForm.get('net_income').setValue(res.net_income);
			this.editForm.get('work_hours_in_day').setValue(res.work_hours_in_day);
			this.editForm.get('work_hours_in_night').setValue(res.work_hours_in_night);
			this.editForm.get('work_place').setValue(res.work_place);
			this.editForm.get('has_insurance').setValue(res.has_insurance);

			//posts
			if (res.posts && res.posts.length !== 0) {
				res.posts.map((item: any, index: number) => {
					this.posts.push(this.existPosts((index === 0 ? true : false), item.id));
				})
			} else {
				this.posts.push(this.newPosts(true));
			}

			//guarantors_info
			if (res.guarantors_info && res.guarantors_info.length !== 0) {
				res.guarantors_info.map((item: any) => {
					this.guarantors.push(this.existGuarantors(item.first_name, item.last_name, item.national_code, item.mobile));
				})
			} else {
				// this.guarantors.push(this.newGuarantors());
			}

			//cheques_info
			if (res.cheques_info && res.cheques_info.length !== 0) {
				res.cheques_info.map((item: any) => {
					this.cheques.push(this.existCheques(item.number, item.amount));
				})
			} else {
				// this.cheques.push(this.newCheques());
			}
			//promissory_notes_info
			if (res.promissory_notes_info && res.promissory_notes_info.length !== 0) {
				res.promissory_notes_info.map((item: any) => {
					this.promissory_notes.push(this.existPromissoryNotes(item.number, item.amount));
				})
			} else {
				// this.promissory_notes.push(this.newPromissoryNotes());
			}


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
