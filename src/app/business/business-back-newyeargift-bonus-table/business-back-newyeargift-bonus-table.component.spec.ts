import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessBackNewyeargiftBonusTableComponent } from './business-back-newyeargift-bonus-table.component';

describe('BusinessBackNewyeargiftBonusTableComponent', () => {
  let component: BusinessBackNewyeargiftBonusTableComponent;
  let fixture: ComponentFixture<BusinessBackNewyeargiftBonusTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessBackNewyeargiftBonusTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessBackNewyeargiftBonusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
