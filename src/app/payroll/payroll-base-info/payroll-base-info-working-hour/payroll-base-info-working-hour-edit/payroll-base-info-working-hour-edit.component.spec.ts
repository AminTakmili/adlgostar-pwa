import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollBaseInfoWorkingHourEditComponent } from './payroll-base-info-working-hour-edit.component';

describe('PayrollBaseInfoWorkingHourEditComponent', () => {
  let component: PayrollBaseInfoWorkingHourEditComponent;
  let fixture: ComponentFixture<PayrollBaseInfoWorkingHourEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollBaseInfoWorkingHourEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollBaseInfoWorkingHourEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
