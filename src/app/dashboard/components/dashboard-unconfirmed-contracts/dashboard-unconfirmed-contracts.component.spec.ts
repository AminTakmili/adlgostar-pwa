import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardUnconfirmedContractsComponent } from './dashboard-unconfirmed-contracts.component';

describe('DashboardUnconfirmedContractsComponent', () => {
  let component: DashboardUnconfirmedContractsComponent;
  let fixture: ComponentFixture<DashboardUnconfirmedContractsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUnconfirmedContractsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardUnconfirmedContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
