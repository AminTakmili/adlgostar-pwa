import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollBaseInfoWorkingHourListComponent } from './payroll-base-info-working-hour-list.component';

describe('PayrollBaseInfoWorkingHourListComponent', () => {
  let component: PayrollBaseInfoWorkingHourListComponent;
  let fixture: ComponentFixture<PayrollBaseInfoWorkingHourListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollBaseInfoWorkingHourListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollBaseInfoWorkingHourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
