import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportWorkinghourWorkingnightComponent } from './business-report-workinghour-workingnight.component';

describe('BusinessReportWorkinghourWorkingnightComponent', () => {
  let component: BusinessReportWorkinghourWorkingnightComponent;
  let fixture: ComponentFixture<BusinessReportWorkinghourWorkingnightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportWorkinghourWorkingnightComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportWorkinghourWorkingnightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
