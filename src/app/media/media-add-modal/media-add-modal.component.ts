import { GlobalService } from './../../core/services/global.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media-add-modal',
  templateUrl: './media-add-modal.component.html',
  styleUrls: ['./media-add-modal.component.scss'],
})
export class MediaAddModalComponent implements OnInit {
	@Input('id') id: string;

	addForm: FormGroup;
	apiObj:FormArray

	constructor(
		private fb: FormBuilder,
		public modalController: ModalController,
		public global: GlobalService,
    private cd: ChangeDetectorRef,
	) {
		this.addForm = fb.group({
			
			files:new FormArray([this.newApiObj()])
		});
		this.apiObj=this.addForm.get('files') as FormArray
	
	}
	ionViewWillEnter(){
		this.apiObj?.clear()
		this.addAnotherFile()
	}
	ngOnInit() {
		console.log(this.id);
	}
	get getApiObj():FormArray{
		return this.addForm.get('files') as FormArray
	} 
	newApiObj():FormGroup{
		return this.fb.group(
			{
				category_id:[this.id],
				title:[, Validators.required],
				file:[, Validators.required],


			}
		)
	}
	addAnotherFile(){
		this.apiObj.push(this.newApiObj())

	}
removeAddress(index: number) {

		this.global.showAlert('حذف آدرس',
		'آیا برای حذف آدرس اطمینان دارید ؟ ',
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
					// this.businessAddress.splice(index, 1);
					this.apiObj.removeAt(index);
				}
			});
		});
	}
	//
  setFile(event: any, item : FormGroup|AbstractControl) {
		const reader = new FileReader();
		console.log(reader);
		console.log(event.target.files);
		console.log(event.target.files[0].size);
		console.log(item);
		if (event.target.files && event.target.files.length) {
			if (event.target?.files[0]?.size<=50000000) {
				
				const [file] = event.target.files;
				reader.readAsDataURL(file);
	
				reader.onload = () => {
					console.log(reader);
				item.patchValue({
					file: reader.result
					});
					// item.get('file').setValue(reader.result)
					this.cd.markForCheck();
				};
			}else{
				this.global.showToast(`فابل باید کمتر از پنجاه مگابایت حجم داشته باشد (حجم فایل کنونی ${event.target.files[0].size>=1000000000?(( event.target.files[0].size)/1000000000+'Gb'):(( event.target.files[0].size)/1000000+'Mb')})`,1500,'top','danger','ios')

			
			}
		}
		console.log(this.addForm.value);
	}
	
	



	async submit() {
		
		console.log(this.addForm.value);
		this.addForm.markAllAsTouched();
		if (this.addForm.valid) {
			await this.global.showLoading()
			this.global.httpPost('uploadedFile/add', this.addForm.value).subscribe(
				async (res:any) => {
					await this.global.dismisLoading()

					console.log(res);
					this.modalController.dismiss({
						dismissed: true,
						list: this.addForm.value,
						res
				// postList:this.postList
					});
				},
				async (error:any) => {
					await this.global.dismisLoading()
					await this.global.showError(error)
			
				}
			)
		}
	}

}
