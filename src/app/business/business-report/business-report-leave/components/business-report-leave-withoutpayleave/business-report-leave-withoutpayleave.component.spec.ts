import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportLeaveWithoutpayleaveComponent } from './business-report-leave-withoutpayleave.component';

describe('BusinessReportLeaveWithoutpayleaveComponent', () => {
  let component: BusinessReportLeaveWithoutpayleaveComponent;
  let fixture: ComponentFixture<BusinessReportLeaveWithoutpayleaveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportLeaveWithoutpayleaveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportLeaveWithoutpayleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
