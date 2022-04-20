import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardNocontractEmployeeComponent } from './dashboard-nocontract-employee.component';

describe('DashboardNocontractEmployeeComponent', () => {
  let component: DashboardNocontractEmployeeComponent;
  let fixture: ComponentFixture<DashboardNocontractEmployeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNocontractEmployeeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardNocontractEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
