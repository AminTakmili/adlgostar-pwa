import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLeavePaidleaveComponent } from './business-report-leave-paidleave.component';

describe('BusinessReportLeavePaidleaveComponent', () => {
  let component: BusinessReportLeavePaidleaveComponent;
  let fixture: ComponentFixture<BusinessReportLeavePaidleaveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLeavePaidleaveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLeavePaidleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
