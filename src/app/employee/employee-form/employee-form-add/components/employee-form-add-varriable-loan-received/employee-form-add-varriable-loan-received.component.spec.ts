import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeeFormAddVarriableLoanReceivedComponent } from './employee-form-add-varriable-loan-received.component';

describe('EmployeeFormAddVarriableLoanReceivedComponent', () => {
  let component: EmployeeFormAddVarriableLoanReceivedComponent;
  let fixture: ComponentFixture<EmployeeFormAddVarriableLoanReceivedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormAddVarriableLoanReceivedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormAddVarriableLoanReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
