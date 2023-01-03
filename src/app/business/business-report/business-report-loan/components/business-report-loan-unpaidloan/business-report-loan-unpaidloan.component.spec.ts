import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLoanUnpaidloanComponent } from './business-report-loan-unpaidloan.component';

describe('BusinessReportLoanUnpaidloanComponent', () => {
  let component: BusinessReportLoanUnpaidloanComponent;
  let fixture: ComponentFixture<BusinessReportLoanUnpaidloanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLoanUnpaidloanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLoanUnpaidloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
