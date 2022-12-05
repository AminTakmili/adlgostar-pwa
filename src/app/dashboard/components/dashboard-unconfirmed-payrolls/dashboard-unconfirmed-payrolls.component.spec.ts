import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardUnconfirmedPayrollsComponent } from './dashboard-unconfirmed-payrolls.component';

describe('DashboardUnconfirmedPayrollsComponent', () => {
  let component: DashboardUnconfirmedPayrollsComponent;
  let fixture: ComponentFixture<DashboardUnconfirmedPayrollsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUnconfirmedPayrollsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardUnconfirmedPayrollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
