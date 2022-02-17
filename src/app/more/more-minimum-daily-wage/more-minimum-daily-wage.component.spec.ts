import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreMinimumDailyWageComponent } from './more-minimum-daily-wage.component';

describe('MoreMinimumDailyWageComponent', () => {
  let component: MoreMinimumDailyWageComponent;
  let fixture: ComponentFixture<MoreMinimumDailyWageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreMinimumDailyWageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreMinimumDailyWageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
