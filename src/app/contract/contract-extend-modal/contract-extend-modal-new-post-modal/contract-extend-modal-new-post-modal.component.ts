import { Employee } from 'src/app/core/models/employee.model';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/core/services/global.service';
import { Post } from 'src/app/core/models/post.model';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-extend-modal-new-post-modal',
  templateUrl: './contract-extend-modal-new-post-modal.component.html',
  styleUrls: ['./contract-extend-modal-new-post-modal.component.scss'],
})
export class ContractExtendModalNewPostModalComponent implements OnInit {
  @Input('employeeList') employeeList :Employee[]

  postForm:FormGroup
  posts: FormArray;
	postList: Post[];
  constructor(
    public global:GlobalService,
    public modalController: ModalController,
    private fb:FormBuilder,
  ) {
    this.postForm = this.fb.group({
		
		business_employee_id: ['', Validators.compose([Validators.required])],
		
			posts: this.fb.array([]),
		
		});

		this.posts = this.postForm.get('posts') as FormArray;
   }

  ngOnInit() {
     this.getPostData()
  }
  ionViewWillEnter() {
    this.postForm.reset()
    this.postsFormGroup.clear()
	}
  // posts
	get postsFormGroup(): FormArray {
		return  this.postForm?.get('posts') as FormArray;
	}

	newPosts(isTrue: boolean,post?:Post): FormGroup {
		return this.fb.group({
			post_id: [post?.id, Validators.compose([Validators.required])],
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

  getPostData() {
		// const employees = this.global.httpPost('employee/filteredList', {
		// 	for_combo: true,
		// 	limit: 10,
		// 	offset: 0,
		// });

		this.global.httpPost('post/filteredList',{
			limit: 5000,
			offset: 0,
		})
			.subscribe(
       async (res:any) => {
        this.postList = res.list.map((item: any) => {
          return new Post().deserialize(item);
        });
       }
      );
	}

 async employeeChange(){
    await this.global.showLoading()
    this.global.httpPost('business/employee/detail',{
      business_employee_id:this.postForm.value.business_employee_id
    }).subscribe(
     async (res:any) => {
     await this.global.dismisLoading()
     this.postsFormGroup.clear()
     res.posts.map((post:any,index:number)=>{
      this.posts.push(this.newPosts(index==0,post))

     })
      
     },
     async (error:any) => {
      await this.global.dismisLoading()
this.global.showError(error)
     },
    )
  }
 async  setNewPost(){
    
    this.postForm.markAllAsTouched()
    if ( this.postForm.valid) {
      
  this.modalController.dismiss({
    'dismissed': true,
    postForm:this.postForm,
    postList:this.postList
  });
 
    }


  }
 

}
