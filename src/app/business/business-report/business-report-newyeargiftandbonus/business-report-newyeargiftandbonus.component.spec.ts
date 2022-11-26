import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessReportNewyeargiftandbonusComponent } from './business-report-newyeargiftandbonus.component';

describe('BusinessReportNewyeargiftandbonusComponent', () => {
  let component: BusinessReportNewyeargiftandbonusComponent;
  let fixture: ComponentFixture<BusinessReportNewyeargiftandbonusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReportNewyeargiftandbonusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessReportNewyeargiftandbonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
