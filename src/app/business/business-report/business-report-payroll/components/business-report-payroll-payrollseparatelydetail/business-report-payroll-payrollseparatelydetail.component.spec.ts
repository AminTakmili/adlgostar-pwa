import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportPayrollPayrollseparatelydetailComponent } from './business-report-payroll-payrollseparatelydetail.component';

describe('BusinessReportPayrollPayrollseparatelydetailComponent', () => {
  let component: BusinessReportPayrollPayrollseparatelydetailComponent;
  let fixture: ComponentFixture<BusinessReportPayrollPayrollseparatelydetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportPayrollPayrollseparatelydetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportPayrollPayrollseparatelydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
