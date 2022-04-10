import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreMinimumDailyWageEditComponent } from './more-minimum-daily-wage-edit.component';

describe('MoreMinimumDailyWageEditComponent', () => {
  let component: MoreMinimumDailyWageEditComponent;
  let fixture: ComponentFixture<MoreMinimumDailyWageEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreMinimumDailyWageEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreMinimumDailyWageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
