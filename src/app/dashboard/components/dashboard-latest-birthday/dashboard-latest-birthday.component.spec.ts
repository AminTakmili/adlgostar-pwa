import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardLatestBirthdayComponent } from './dashboard-latest-birthday.component';

describe('DashboardLatestBirthdayComponent', () => {
  let component: DashboardLatestBirthdayComponent;
  let fixture: ComponentFixture<DashboardLatestBirthdayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLatestBirthdayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLatestBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
