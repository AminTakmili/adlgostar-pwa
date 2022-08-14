import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollSettlementDeductionListComponent } from './payroll-settlement-deduction-list.component';

describe('PayrollSettlementDeductionListComponent', () => {
  let component: PayrollSettlementDeductionListComponent;
  let fixture: ComponentFixture<PayrollSettlementDeductionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSettlementDeductionListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollSettlementDeductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
