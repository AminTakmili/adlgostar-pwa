import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportPayrollSummarypayrollComponent } from './business-report-payroll-summarypayroll.component';

describe('BusinessReportPayrollSummarypayrollComponent', () => {
  let component: BusinessReportPayrollSummarypayrollComponent;
  let fixture: ComponentFixture<BusinessReportPayrollSummarypayrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportPayrollSummarypayrollComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportPayrollSummarypayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
