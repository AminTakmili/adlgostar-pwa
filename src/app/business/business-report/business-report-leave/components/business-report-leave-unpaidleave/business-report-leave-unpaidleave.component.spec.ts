import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLeaveUnpaidleaveComponent } from './business-report-leave-unpaidleave.component';

describe('BusinessReportLeaveUnpaidleaveComponent', () => {
  let component: BusinessReportLeaveUnpaidleaveComponent;
  let fixture: ComponentFixture<BusinessReportLeaveUnpaidleaveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLeaveUnpaidleaveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLeaveUnpaidleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
