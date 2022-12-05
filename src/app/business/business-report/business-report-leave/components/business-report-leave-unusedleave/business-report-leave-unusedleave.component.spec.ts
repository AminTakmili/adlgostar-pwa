import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLeaveUnusedleaveComponent } from './business-report-leave-unusedleave.component';

describe('BusinessReportLeaveUnusedleaveComponent', () => {
  let component: BusinessReportLeaveUnusedleaveComponent;
  let fixture: ComponentFixture<BusinessReportLeaveUnusedleaveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLeaveUnusedleaveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLeaveUnusedleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
