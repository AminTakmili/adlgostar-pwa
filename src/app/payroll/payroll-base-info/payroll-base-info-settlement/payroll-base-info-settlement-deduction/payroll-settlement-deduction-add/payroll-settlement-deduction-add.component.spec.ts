import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollSettlementDeductionAddComponent } from './payroll-settlement-deduction-add.component';

describe('PayrollSettlementDeductionAddComponent', () => {
  let component: PayrollSettlementDeductionAddComponent;
  let fixture: ComponentFixture<PayrollSettlementDeductionAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSettlementDeductionAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollSettlementDeductionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
