import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLoanPaidloanComponent } from './business-report-loan-paidloan.component';

describe('BusinessReportLoanPaidloanComponent', () => {
  let component: BusinessReportLoanPaidloanComponent;
  let fixture: ComponentFixture<BusinessReportLoanPaidloanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLoanPaidloanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLoanPaidloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
