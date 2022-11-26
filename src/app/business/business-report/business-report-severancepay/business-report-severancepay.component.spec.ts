import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportSeverancepayComponent } from './business-report-severancepay.component';

describe('BusinessReportSeverancepayComponent', () => {
  let component: BusinessReportSeverancepayComponent;
  let fixture: ComponentFixture<BusinessReportSeverancepayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportSeverancepayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportSeverancepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
