import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportPayrollDelayedpayrolComponent } from './business-report-payroll-delayedpayrol.component';

describe('BusinessReportPayrollDelayedpayrolComponent', () => {
  let component: BusinessReportPayrollDelayedpayrolComponent;
  let fixture: ComponentFixture<BusinessReportPayrollDelayedpayrolComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportPayrollDelayedpayrolComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportPayrollDelayedpayrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
