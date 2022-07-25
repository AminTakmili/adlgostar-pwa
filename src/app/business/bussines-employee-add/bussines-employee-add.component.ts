import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { concat, Observable, of, Subject, throwError } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	switchMap,
	tap,
	map,
	filter,
} from 'rxjs/operators';

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
	pageTitle: string = 'ثبت کارمند جدید به کسب کار';
	addForm: FormGroup;

	postList: Post[];
	businessId: string;
	employeeId: string;
	// employeeName: string;

	employeelist$: Observable<Employee[]>;
	inputLoading = false;
	employeeInput$ = new Subject<string>();
	selectedMovie: any;
	minLengthTerm = 3;

	posts: FormArray;
	guarantors: FormArray;
	cheques: FormArray;
	promissory_notes: FormArray;
	agreed_arbitrators: FormArray;

	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		public route: ActivatedRoute
	) {
		this.addForm = this.fb.group({
			business_id: [
				this.route.snapshot.paramMap.get('id'),
				Validators.compose([Validators.required]),
			],
			employee_id: ['', Validators.compose([Validators.required])],
			specialty: ['', Validators.compose([Validators.required])],
			net_income: ['', Validators.compose([Validators.required])],
			work_hours_in_day: ['', Validators.compose([Validators.required])],
			work_hours_in_night: [''],
			work_place: ['', Validators.compose([Validators.required])],
			has_insurance: [false, Validators.compose([Validators.required])],
			employee_start_date: [
				false,
				Validators.compose([Validators.required]),
			],
			posts: this.fb.array([this.newPosts(true)]),
			guarantors: this.fb.array([]),
			cheques: this.fb.array([]),
			promissory_notes: this.fb.array([]),
			agreed_arbitrators: this.fb.array([]),
		});

		this.posts = this.addForm.get('posts') as FormArray;
		this.guarantors = this.addForm.get('guarantors') as FormArray;
		this.cheques = this.addForm.get('cheques') as FormArray;
		this.promissory_notes = this.addForm.get(
			'promissory_notes'
		) as FormArray;
		this.agreed_arbitrators = this.addForm.get(
			'agreed_arbitrators'
		) as FormArray;

		this.businessId = this.route.snapshot.paramMap.get('id');
		this.employeeId = this.route.snapshot.queryParamMap.get('id');
		
		if (this.employeeId) {
			this.getEmployeeById(this.employeeId);
		} else {
			this.loadEmployee();
		}
		console.log(this.employeelist$);
	}
	employChange(){
		if (this.employeeId) {
			this.loadEmployee();
		}
	}

	loadEmployee() {
		this.employeelist$ = concat(
			of([]), // default items
			this.employeeInput$.pipe(
				filter((res) => {
					return res !== null && res.length >= this.minLengthTerm;
				}),
				distinctUntilChanged(),
				debounceTime(800),
				tap(() => (this.inputLoading = true)),
				switchMap((term) => {
					return this.getEmployee(term).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.inputLoading = false))
					);
				})
			)
		);
	}

	getEmployee(term: string = null): Observable<any> {
		return this.global
			.httpPost('employee/filteredList', {
				filtered_name: term,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.pipe(
				map((resp) => {
					if (resp.Error) {
						throwError(resp.Error);
					} else {
						return resp.list.map((item: any) => {
							return new Employee().deserialize(item);
						});
					}
				})
			);
	}
	async getEmployeeById(employee_id: string = null) {
	await	this.global.showLoading()
		console.log(employee_id);
		this.global
			.httpPost('employee/filteredList', {
				employee_id,
				for_combo: true,
				limit: 1000,
				offset: 0,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading()
					console.log(of(res.list), res.list[0].id);
					this.employeelist$ = of(res.list.map((item: any) => {
						return new Employee().deserialize(item);
					})) ;
				
					this.addForm.get('employee_id').setValue(res.list[0]?.id);
				},
				async (error: any) => {
					await this.global.dismisLoading()

					this.global.showError(error)
					console.log(error);
				}
			);
	}

	// posts
	get postsFormGroup(): FormArray {
		return this.addForm.get('posts') as FormArray;
	}

	newPosts(isTrue: boolean): FormGroup {
		return this.fb.group({
			post_id: ['', Validators.compose([Validators.required])],
			is_default: [isTrue],
		});
	}

	addAnotherPost() {
		this.posts.push(this.newPosts(false));
	}

	removePost(index: number) {
		this.global
			.showAlert('حذف پست', 'آیا برای حذف پست اطمینان دارید ؟ ', [
				{
					text: 'خیر',
					role: 'cancel',
				},
				{
					text: 'بلی',
					role: 'yes',
				},
			])
			.then((alert) => {
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
			national_code: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(10),
					Validators.maxLength(10),
				]),
			],
			mobile: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(11),
					Validators.maxLength(11),
				]),
			],
		});
	}

	addAnotherGuarantors() {
		this.guarantors.push(this.newGuarantors());
	}

	removeGuarantors(index: number) {
		this.global
			.showAlert('حذف ضامن', 'آیا برای حذف ضامن اطمینان دارید ؟ ', [
				{
					text: 'خیر',
					role: 'cancel',
				},
				{
					text: 'بلی',
					role: 'yes',
				},
			])
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						this.guarantors.removeAt(index);
					}
				});
			});
	}
	// داور مرضی الطرفین
	get agreedArbitratorsFormGroup(): FormArray {
		return this.addForm.get('agreed_arbitrators') as FormArray;
	}

	newaGreedArbitrators(): FormGroup {
		return this.fb.group({
			first_name: ['', Validators.compose([Validators.required])],
			last_name: ['', Validators.compose([Validators.required])],
			national_code: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(10),
					Validators.maxLength(10),
				]),
			],
			mobile: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(11),
					Validators.maxLength(11),
				]),
			],
		});
	}

	addAnotherAgreedArbitrators() {
		this.agreed_arbitrators.push(this.newaGreedArbitrators());
	}

	removeAgreedArbitrators(index: number) {
		this.global
			.showAlert(
				'حذف داور مرضی الطرفینداور مرضی الطرفین',
				'آیا برای حذف داور مرضی الطرفین اطمینان دارید ؟ ',
				[
					{
						text: 'خیر',
						role: 'cancel',
					},
					{
						text: 'بلی',
						role: 'yes',
					},
				]
			)
			.then((alert) => {
				alert.present();
				alert.onDidDismiss().then(async (e: any) => {
					if (e.role === 'yes') {
						this.agreed_arbitrators.removeAt(index);
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
		});
	}

	addAnotherCheques() {
		this.cheques.push(this.newCheques());
	}

	removeCheques(index: number) {
		this.global
			.showAlert('حذف چک', 'آیا برای حذف چک اطمینان دارید ؟ ', [
				{
					text: 'خیر',
					role: 'cancel',
				},
				{
					text: 'بلی',
					role: 'yes',
				},
			])
			.then((alert) => {
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
		});
	}

	addAnotherPromissoryNotes() {
		this.promissory_notes.push(this.newPromissoryNotes());
	}

	removePromissoryNotes(index: number) {
		this.global
			.showAlert('حذف سفته', 'آیا برای حذف سفته اطمینان دارید ؟ ', [
				{
					text: 'خیر',
					role: 'cancel',
				},
				{
					text: 'بلی',
					role: 'yes',
				},
			])
			.then((alert) => {
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

	getData() {
		// const employees = this.global.httpPost('employee/filteredList', {
		// 	for_combo: true,
		// 	limit: 10,
		// 	offset: 0,
		// });
		const posts = this.global.httpPost('post/filteredList', {
			limit: 5000,
			offset: 0,
		});
		this.global
			.parallelRequest([ posts])
			.subscribe(([postsRes = '']) => {
				// this.employeesSet(employeesRes);
				this.postsSet(postsRes);
			});
	}

	employeesSet(data: any) {
		// this.employeelist = data.list.map((item: any) => {
		// 	return new Employee().deserialize(item);
		// });
	}
	postsSet(data: any) {
		this.postList = data.list.map((item: any) => {
			return new Post().deserialize(item);
		});
	}
	async onSubmit(AddAnOther: boolean = false) {
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('business/employee/add', this.addForm.value)
				.subscribe(
					async (res: any) => {
						await this.global.dismisLoading();
						// console.log(res:any);
						if (!AddAnOther) {
							this.navCtrl.navigateForward(
								'/businesses/detail/' + this.businessId
							);
						}
						this.global.showToast('کارمند با موفقیت اضافه شد');
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
