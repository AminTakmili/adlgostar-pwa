import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BusinessCategory } from 'src/app/core/models/business.model';
import { permision, permissionsDetail, userType } from 'src/app/core/models/user.model';
import { GlobalService } from 'src/app/core/services/global.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-users-role-add',
  templateUrl: './users-role-add.component.html',
  styleUrls: ['./users-role-add.component.scss'],
})
export class UsersRoleAddComponent implements OnInit {

	pageTitle: string = " نقش جدید ";
	addFrom: FormGroup;

	userType:userType[];
	permision : permision[];

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
		this.addFrom = this.fb.group({
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
		this.getExtra()
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

		const userType = this.global.httpPost('user/userType/list', { limit: 100 , offset: 0 , type : "user" });

		const permission = this.global.httpPost('user/permission/list',{ limit: 300 , offset: 0 ,   });

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
		if (this.addFrom.valid) {

			let permission : any[]= [];
			this.permision.map((cat)=>{
				cat.permissions.map((item)=>{
					if(item.is_checked){
						permission.push(item.id);
					}
				});
			});


			 console.log(this.addFrom.value);
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global.httpPost('user/role/add', {
				user_type_id : this.addFrom.value.user_type_id ,
				is_default_employer_role : this.addFrom.value.is_default_employer_role ,
				name :  this.addFrom.value.name,
				permission_ids : permission ,
			})
				.subscribe(async (res:any) => {

					await this.global.dismisLoading();
					// console.log(res:any);
					this.navCtrl.navigateForward('/users/role');
					this.global.showToast('نقش جدید با نام  ' + this.addFrom.value.name + ' ثبت شد .');
					this.addFrom.reset();
				}, async (error:any) => {
					await this.global.dismisLoading();
					this.global.showError(error);
				});
		}
	}

	setCheck(item : permissionsDetail){
		item.is_checked = !item.is_checked ;
	}

}
