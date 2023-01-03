import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLoanWorkinghourcountComponent } from './business-report-loan-workinghourcount.component';

describe('BusinessReportLoanWorkinghourcountComponent', () => {
  let component: BusinessReportLoanWorkinghourcountComponent;
  let fixture: ComponentFixture<BusinessReportLoanWorkinghourcountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLoanWorkinghourcountComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLoanWorkinghourcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
