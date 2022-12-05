import { mediafile } from './../../core/models/media.model';
import { GlobalService } from './../../core/services/global.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media-edit-modal',
  templateUrl: './media-edit-modal.component.html',
  styleUrls: ['./media-edit-modal.component.scss'],
})
export class MediaEditModalComponent implements OnInit {
	@Input('item') item: mediafile;
	@Input('category_id') category_id: string;
id:number
	addForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		public modalController: ModalController,
		public global: GlobalService,
    private cd: ChangeDetectorRef,
	) {
		this.addForm = fb.group({
      id:[this.id],
      category_id:[this.category_id],
      title:[, Validators.required],
      file:[, Validators.required],


    });
	
	}
	ionViewWillEnter(){
	this.id=this.item.id
  this.addForm.get('category_id').setValue(this.item.uploaded_file_category_id)
  this.addForm.get('title').setValue(this.item.title)
  this.addForm.get('id').setValue(this.item.id)
	}
	ngOnInit() {
		console.log(this.category_id);
	}
	
	//
  setFile(event: any,) {
		const reader = new FileReader();
		console.log(reader);
		console.log(event.target.files);
		console.log(event.target.files[0].size);
		if (event.target.files && event.target.files.length) {
			if (event.target?.files[0]?.size<=50000000) {
				
				const [file] = event.target.files;
				reader.readAsDataURL(file);
	
				reader.onload = () => {
					console.log(reader);
          this.addForm.patchValue({
					file: reader.result,
          id:this.id,
          category_id:this.category_id,
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
			this.global.httpPatch('uploadedFile/edit', this.addForm.value).subscribe(
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
