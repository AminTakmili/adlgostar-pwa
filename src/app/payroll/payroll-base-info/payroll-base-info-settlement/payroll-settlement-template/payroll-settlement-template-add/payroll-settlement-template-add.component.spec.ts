import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollSettlementTemplateAddComponent } from './payroll-settlement-template-add.component';

describe('PayrollSettlementTemplateAddComponent', () => {
  let component: PayrollSettlementTemplateAddComponent;
  let fixture: ComponentFixture<PayrollSettlementTemplateAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSettlementTemplateAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollSettlementTemplateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
