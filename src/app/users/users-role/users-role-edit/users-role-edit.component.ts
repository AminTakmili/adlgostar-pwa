import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BusinessCategory } from 'src/app/core/models/business.model';
import { permision, permissionsDetail, UserRole, userType } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-users-role-edit',
  templateUrl: './users-role-edit.component.html',
  styleUrls: ['./users-role-edit.component.scss'],
})
export class UsersRoleEditComponent implements OnInit {

	pageTitle: string = " نقش جدید ";
	editForm: FormGroup;

	userType:userType[];
	permision : permision[];

	dataList: UserRole = new UserRole();

	businessCatgeories : BusinessCategory[];
	categoryId: number;
	constructor(
		public global: GlobalService,
		private fb: FormBuilder,
		private seo: SeoService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
	) {
		// if(this.route.snapshot.paramMap.get('id')){
		// 	this.categoryId = parseInt(this.route.snapshot.paramMap.get('id'));
		// }
		this.editForm = this.fb.group({
			id : [],
			user_type_id: ['', Validators.compose( [Validators.required ] ) ],
			is_default_employer_role: [ false , Validators.compose( [Validators.required ] ) ],
			name: ['', Validators.compose( [Validators.required ] ) ],
			permission_ids : []
		});

	}

	ngOnInit() {
		this.setTitle();

	}
	ionViewWillEnter() {
		this.getData(this.route.snapshot.paramMap.get('id'));
		this.getExtra();
	}

	async getData(id: string) {

		await this.global.showLoading('لطفا منتظر بمانید...');
		this.global.httpPost('user/role/detail', {
			id: id,
		}).subscribe(async (res:any) => {
			await this.global.dismisLoading();

			this.dataList = new UserRole().deserialize(res);

			this.editForm = this.fb.group({
				id: [this.dataList.id],
				user_type_id: [this.dataList.user_type.id, Validators.compose([Validators.required]) ],
				is_default_employer_role: [this.dataList.is_default_employer_role, Validators.compose([Validators.required]) ],
				name: [this.dataList.name, Validators.compose([Validators.required])],
			});

			// console.log(this.dataList);
			// console.log(res:any);
		}, async (error:any) => {
			await this.global.dismisLoading();
			this.global.showError(error);
		});
	}

	setTitle() {
		this.seo.generateTags({
			title: this.pageTitle,
			description: this.pageTitle,
			keywords: this.pageTitle,
			isNoIndex: false,
		});
	}

	getExtra() {
		const userType = this.global.httpPost('user/userType/list', { limit: 100 , offset: 0 , type : "user"});
		const permission = this.global.httpPost('user/permission/list',{ limit: 300 , offset: 0 });
		this.global.parallelRequest([userType, permission])
			.subscribe(([userTypeRes, permissionRes  ='']) => {
				this.setUserType(userTypeRes);
				this.setPermision(permissionRes);
			});
	}

	setPermision(data:any){
		this.permision = data.list.map((item:any)=>{
			return new permision().deserialize(item);
		});

	}
	setUserType(data:any){
		this.userType = data.list.map((item:any)=>{
			return new userType().deserialize(item);
		});

	}
	async onSubmit() {
		if (this.editForm.valid) {

			let permission : any[]= [];
			this.permision.map((cat)=>{
				cat.permissions.map((item)=>{
					if(item.is_checked){
						permission.push(item.id);
					}
				});
			});


			 console.log(this.editForm.value);
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPatch('user/role/edit', {
				id: this.editForm.value.id,
				user_type_id : this.editForm.value.user_type_id ,
				is_default_employer_role : this.editForm.value.is_default_employer_role ,
				name :  this.editForm.value.name,
				permission_ids : permission ,
			})
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/users/role');
					this.global.showToast('نقش  با نام  ' + this.editForm.value.name + ' ویرایش شد .');
					this.editForm.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	setCheck(item : permissionsDetail){
		item.is_checked = !item.is_checked ;
	}
	checkPermision(item : permissionsDetail){

		const index = this.dataList.permissions.findIndex(x=>x.id === item.id);

		if(index !== -1){
			item.is_checked = true;
			return true
		}else{
			return false;
		}

		// item.id
	}

}
