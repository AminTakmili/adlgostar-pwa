import { ContractExtendModalNewPostModalComponent } from './contract-extend-modal-new-post-modal/contract-extend-modal-new-post-modal.component';
import { Employee } from './../../core/models/employee.model';
import { Post } from './../../core/models/post.model';
import { GlobalService } from './../../core/services/global.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-contract-extend-modal',
	templateUrl: './contract-extend-modal.component.html',
	styleUrls: ['./contract-extend-modal.component.scss'],
})
export class ContractExtendModalComponent implements OnInit {
	@Input('employeeList') employeeList: Employee[];
	@Input('type') type: string;

	addForm: FormGroup;
	business_employee_new_posts: FormArray;
  postList:Post[]

	constructor(
		private fb: FormBuilder,
		public modalController: ModalController,
		public global: GlobalService
	) {
		this.addForm = fb.group({
			new_wage: [
				,
				Validators.compose([Validators.required, Validators.min(0)]),
			],
			extend_date: [, Validators.required],
			text: ['درخواست تمدید قرارداد را دارم'],
			business_employee_new_posts: fb.array([]),
		});
		this.business_employee_new_posts = this.addForm.get(
			'business_employee_new_posts'
		) as FormArray;
	}
	ngOnInit() {
		console.log(this.employeeList);
	}

	//

	get employeeNewPostsFormGroup(): FormArray {
		return this.addForm.get('business_employee_new_posts') as FormArray;
	}

	// newEmployeeNewPosts(): FormGroup {
	// 	return this.fb.group({
	// 		city_id: ['', Validators.compose([Validators.required])],
	// 		address: ['', Validators.compose([Validators.required])],
	// 		postal_code: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
	// 		phone: ['', Validators.compose([Validators.required,Validators.maxLength(11)])],
	// 	}) ;
	// }

	async openNewPostModal() {
		const modal = await this.modalController.create({
			component: ContractExtendModalNewPostModalComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			//   presentingElement:this.routerOutlet.nativeEl,
			swipeToClose: true,
			componentProps: {
				employeeList: this.employeeList,
			},
		});

		modal.onWillDismiss().then(async (res) => {
			// console.log(res);
			if (res.data && res.data.dismissed) {
        console.log(res.data.postList);
        this.postList=res.data.postList;
				if (
					!this.employeeNewPostsFormGroup?.value?.find(
						(item: any) => {
							return (
								item.business_employee_id ==
								res.data.postForm.value.business_employee_id
							);
						}
					)
				) {
					this.business_employee_new_posts.push(res.data.postForm);
					this.global.showToast(
						' پست جدید با موفقیت انتصاب یافت ',
						1000,
						'top',
						'success',
						'ios'
					);
				} else {
					if (
						this.employeeNewPostsFormGroup?.value?.find(
							(item: any) => {
								return (
									item.business_employee_id ==
									res.data.postForm.value.business_employee_id
								);
							}
						)?.posts
					) {
						this.employeeNewPostsFormGroup.value.find(
							(item: any) => {
								return (
									item.business_employee_id ==
									res.data.postForm.value.business_employee_id
								);
							}
						).posts = res.data.postForm.value.posts;
						this.global.showToast(
							' پست جدید با موفقیت ویرایش شد ',
							1000,
							'top',
							'success',
							'ios'
						);
					}
				}
			}
		});

		return await modal.present();
	}
  getemployName(id:any){
return  this.employeeList.find((employee:any)=>{return employee?.business_employee_info?.id==id})?.full_name 
  }
  getPostName(id:any){
return this.postList?.find((postItem:Post)=>{return postItem.id==id})?.name
  }

	submit() {
		
		// console.log(this.addForm.value);
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			this.modalController.dismiss({
				dismissed: true,
				list: this.addForm.value,
        postList:this.postList
			});
		}
	}
}
