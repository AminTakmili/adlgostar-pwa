import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportMonthlywageComponent } from './business-report-monthlywage.component';

describe('BusinessReportMonthlywageComponent', () => {
  let component: BusinessReportMonthlywageComponent;
  let fixture: ComponentFixture<BusinessReportMonthlywageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportMonthlywageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportMonthlywageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
