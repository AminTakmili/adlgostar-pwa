import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreMinimumDailyWageAddComponent } from './more-minimum-daily-wage-add.component';

describe('MoreMinimumDailyWageAddComponent', () => {
  let component: MoreMinimumDailyWageAddComponent;
  let fixture: ComponentFixture<MoreMinimumDailyWageAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreMinimumDailyWageAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreMinimumDailyWageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
