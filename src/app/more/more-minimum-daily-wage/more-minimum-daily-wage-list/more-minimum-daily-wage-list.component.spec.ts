import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreMinimumDailyWageListComponent } from './more-minimum-daily-wage-list.component';

describe('MoreMinimumDailyWageListComponent', () => {
  let component: MoreMinimumDailyWageListComponent;
  let fixture: ComponentFixture<MoreMinimumDailyWageListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreMinimumDailyWageListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreMinimumDailyWageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
