import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLeaveUsedleaveComponent } from './business-report-leave-usedleave.component';

describe('BusinessReportLeaveUsedleaveComponent', () => {
  let component: BusinessReportLeaveUsedleaveComponent;
  let fixture: ComponentFixture<BusinessReportLeaveUsedleaveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLeaveUsedleaveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLeaveUsedleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
