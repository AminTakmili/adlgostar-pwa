import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollSettlementDeductionEditComponent } from './payroll-settlement-deduction-edit.component';

describe('PayrollSettlementDeductionEditComponent', () => {
  let component: PayrollSettlementDeductionEditComponent;
  let fixture: ComponentFixture<PayrollSettlementDeductionEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSettlementDeductionEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollSettlementDeductionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
