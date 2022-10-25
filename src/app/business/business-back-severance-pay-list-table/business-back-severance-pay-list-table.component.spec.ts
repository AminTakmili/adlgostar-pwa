import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessBackSeverancePayListTableComponent } from './business-back-severance-pay-list-table.component';

describe('BusinessBackSeverancePayListTableComponent', () => {
  let component: BusinessBackSeverancePayListTableComponent;
  let fixture: ComponentFixture<BusinessBackSeverancePayListTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessBackSeverancePayListTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessBackSeverancePayListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
