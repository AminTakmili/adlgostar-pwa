import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeeFormEditVarriableLoanReceivedComponent } from './employee-form-edit-varriable-loan-received.component';

describe('EmployeeFormEditVarriableLoanReceivedComponent', () => {
  let component: EmployeeFormEditVarriableLoanReceivedComponent;
  let fixture: ComponentFixture<EmployeeFormEditVarriableLoanReceivedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormEditVarriableLoanReceivedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormEditVarriableLoanReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
