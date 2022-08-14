import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportPayrollRemainingleaveComponent } from './report-payroll-remainingleave.component';

describe('ReportPayrollRemainingleaveComponent', () => {
  let component: ReportPayrollRemainingleaveComponent;
  let fixture: ComponentFixture<ReportPayrollRemainingleaveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPayrollRemainingleaveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPayrollRemainingleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
