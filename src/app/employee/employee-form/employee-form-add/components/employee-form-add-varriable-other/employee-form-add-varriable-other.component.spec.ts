import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeeFormAddVarriableOtherComponent } from './employee-form-add-varriable-other.component';

describe('EmployeeFormAddVarriableOtherComponent', () => {
  let component: EmployeeFormAddVarriableOtherComponent;
  let fixture: ComponentFixture<EmployeeFormAddVarriableOtherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormAddVarriableOtherComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormAddVarriableOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
