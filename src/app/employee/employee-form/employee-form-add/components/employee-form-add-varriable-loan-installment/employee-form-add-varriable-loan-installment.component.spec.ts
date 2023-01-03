import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeeFormAddVarriableLoanInstallmentComponent } from './employee-form-add-varriable-loan-installment.component';

describe('EmployeeFormAddVarriableLoanInstallmentComponent', () => {
  let component: EmployeeFormAddVarriableLoanInstallmentComponent;
  let fixture: ComponentFixture<EmployeeFormAddVarriableLoanInstallmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormAddVarriableLoanInstallmentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormAddVarriableLoanInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
