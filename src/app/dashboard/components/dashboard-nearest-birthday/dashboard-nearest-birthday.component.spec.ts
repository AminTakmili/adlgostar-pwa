import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardNearestBirthdayComponent } from './dashboard-nearest-birthday.component';

describe('DashboardNearestBirthdayComponent', () => {
  let component: DashboardNearestBirthdayComponent;
  let fixture: ComponentFixture<DashboardNearestBirthdayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNearestBirthdayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardNearestBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
