import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportPayrollMonthlywageComponent } from './report-payroll-monthlywage.component';

describe('ReportPayrollMonthlywageComponent', () => {
  let component: ReportPayrollMonthlywageComponent;
  let fixture: ComponentFixture<ReportPayrollMonthlywageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPayrollMonthlywageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPayrollMonthlywageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
