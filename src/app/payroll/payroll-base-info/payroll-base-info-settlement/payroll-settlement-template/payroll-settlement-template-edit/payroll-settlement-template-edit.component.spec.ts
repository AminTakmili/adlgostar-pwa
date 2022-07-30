import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollSettlementTemplateEditComponent } from './payroll-settlement-template-edit.component';

describe('PayrollSettlementTemplateEditComponent', () => {
  let component: PayrollSettlementTemplateEditComponent;
  let fixture: ComponentFixture<PayrollSettlementTemplateEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSettlementTemplateEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollSettlementTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
