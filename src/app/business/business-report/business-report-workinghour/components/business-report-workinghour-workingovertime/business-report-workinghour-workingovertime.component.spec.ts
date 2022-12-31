import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportWorkinghourWorkingovertimeComponent } from './business-report-workinghour-workingovertime.component';

describe('BusinessReportWorkinghourWorkingovertimeComponent', () => {
  let component: BusinessReportWorkinghourWorkingovertimeComponent;
  let fixture: ComponentFixture<BusinessReportWorkinghourWorkingovertimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportWorkinghourWorkingovertimeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportWorkinghourWorkingovertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
