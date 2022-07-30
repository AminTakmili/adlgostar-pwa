import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollSettlementAdditionEditComponent } from './payroll-settlement-addition-edit.component';

describe('PayrollSettlementAdditionEditComponent', () => {
  let component: PayrollSettlementAdditionEditComponent;
  let fixture: ComponentFixture<PayrollSettlementAdditionEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSettlementAdditionEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollSettlementAdditionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
