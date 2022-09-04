import { PayrollListNewAddComponent } from './payroll-list-new-add/payroll-list-new-add.component';
import { PayrollListEditComponent } from './payroll-list-edit/payroll-list-edit.component';
import { PayrollListListComponent } from './payroll-list-list/payroll-list-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ng2-ckeditor';
import { ClipboardModule } from 'ngx-clipboard';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { PayrollListAddComponent } from './payroll-list-add/payroll-list-add.component';
import { PayrollListPageRoutingModule } from './payroll-routing.module';
import { PipeModule } from './../../core/pipes/pipe.module';
import { ShareModulePageModule } from 'src/app/share-module/share-module.module';

// import { PayrollListPage } from './payroll-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollListPageRoutingModule,
    ShareModulePageModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgSelectModule,
		CKEditorModule,
		NgPersianDatepickerModule,
		ClipboardModule,
		PipeModule
    
  ],
  declarations: [PayrollListAddComponent,PayrollListListComponent,PayrollListEditComponent,PayrollListNewAddComponent]
})
export class PayrollListPageModule {}
