import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminReportInactivecontractComponent } from './admin-report-inactivecontract.component';

describe('AdminReportInactivecontractComponent', () => {
  let component: AdminReportInactivecontractComponent;
  let fixture: ComponentFixture<AdminReportInactivecontractComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportInactivecontractComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReportInactivecontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
