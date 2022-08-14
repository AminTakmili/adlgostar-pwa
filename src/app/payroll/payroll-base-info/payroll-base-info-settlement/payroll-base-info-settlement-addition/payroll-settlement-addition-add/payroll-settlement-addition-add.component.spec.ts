import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollSettlementAdditionAddComponent } from './payroll-settlement-addition-add.component';

describe('PayrollSettlementAdditionAddComponent', () => {
  let component: PayrollSettlementAdditionAddComponent;
  let fixture: ComponentFixture<PayrollSettlementAdditionAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSettlementAdditionAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollSettlementAdditionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
