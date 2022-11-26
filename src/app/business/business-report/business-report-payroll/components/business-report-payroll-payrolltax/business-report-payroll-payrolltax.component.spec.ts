import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportPayrollPayrolltaxComponent } from './business-report-payroll-payrolltax.component';

describe('BusinessReportPayrollPayrolltaxComponent', () => {
  let component: BusinessReportPayrollPayrolltaxComponent;
  let fixture: ComponentFixture<BusinessReportPayrollPayrolltaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportPayrollPayrolltaxComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportPayrollPayrolltaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
