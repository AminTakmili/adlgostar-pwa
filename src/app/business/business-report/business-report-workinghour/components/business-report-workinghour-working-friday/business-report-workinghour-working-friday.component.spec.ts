import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportWorkinghourWorkingFridayComponent } from './business-report-workinghour-working-friday.component';

describe('BusinessReportWorkinghourWorkingFridayComponent', () => {
  let component: BusinessReportWorkinghourWorkingFridayComponent;
  let fixture: ComponentFixture<BusinessReportWorkinghourWorkingFridayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportWorkinghourWorkingFridayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportWorkinghourWorkingFridayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
