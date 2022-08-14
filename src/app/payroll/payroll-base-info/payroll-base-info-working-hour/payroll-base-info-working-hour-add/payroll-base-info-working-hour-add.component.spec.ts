import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollBaseInfoWorkingHourAddComponent } from './payroll-base-info-working-hour-add.component';

describe('PayrollBaseInfoWorkingHourAddComponent', () => {
  let component: PayrollBaseInfoWorkingHourAddComponent;
  let fixture: ComponentFixture<PayrollBaseInfoWorkingHourAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollBaseInfoWorkingHourAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollBaseInfoWorkingHourAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
