import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeeFormEditVarriableLoanInstallmentComponent } from './employee-form-edit-varriable-loan-installment.component';

describe('EmployeeFormEditVarriableLoanInstallmentComponent', () => {
  let component: EmployeeFormEditVarriableLoanInstallmentComponent;
  let fixture: ComponentFixture<EmployeeFormEditVarriableLoanInstallmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormEditVarriableLoanInstallmentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormEditVarriableLoanInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
