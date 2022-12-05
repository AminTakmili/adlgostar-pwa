import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardEmployeePieChartComponent } from './dashboard-employee-pie-chart.component';

describe('DashboardEmployeePieChartComponent', () => {
  let component: DashboardEmployeePieChartComponent;
  let fixture: ComponentFixture<DashboardEmployeePieChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEmployeePieChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardEmployeePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
