import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLeaveRemainingleaveComponent } from './business-report-leave-remainingleave.component';

describe('BusinessReportLeaveRemainingleaveComponent', () => {
  let component: BusinessReportLeaveRemainingleaveComponent;
  let fixture: ComponentFixture<BusinessReportLeaveRemainingleaveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLeaveRemainingleaveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLeaveRemainingleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
