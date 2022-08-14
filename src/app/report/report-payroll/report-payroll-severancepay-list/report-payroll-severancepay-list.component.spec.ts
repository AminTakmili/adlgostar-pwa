import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportPayrollSeverancepayListComponent } from './report-payroll-severancepay-list.component';

describe('ReportPayrollSeverancepayListComponent', () => {
  let component: ReportPayrollSeverancepayListComponent;
  let fixture: ComponentFixture<ReportPayrollSeverancepayListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPayrollSeverancepayListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPayrollSeverancepayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
