import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreCalcBasicYearsComponent } from './more-calc-basic-years.component';

describe('MoreCalcBasicYearsComponent', () => {
  let component: MoreCalcBasicYearsComponent;
  let fixture: ComponentFixture<MoreCalcBasicYearsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreCalcBasicYearsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreCalcBasicYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
