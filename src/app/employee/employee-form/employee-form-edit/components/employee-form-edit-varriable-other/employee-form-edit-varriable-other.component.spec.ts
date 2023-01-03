import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeeFormEditVarriableOtherComponent } from './employee-form-edit-varriable-other.component';

describe('EmployeeFormEditVarriableOtherComponent', () => {
  let component: EmployeeFormEditVarriableOtherComponent;
  let fixture: ComponentFixture<EmployeeFormEditVarriableOtherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormEditVarriableOtherComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormEditVarriableOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
