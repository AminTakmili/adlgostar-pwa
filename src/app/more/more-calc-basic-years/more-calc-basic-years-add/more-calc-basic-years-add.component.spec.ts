import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreCalcBasicYearsAddComponent } from './more-calc-basic-years-add.component';

describe('MoreCalcBasicYearsAddComponent', () => {
  let component: MoreCalcBasicYearsAddComponent;
  let fixture: ComponentFixture<MoreCalcBasicYearsAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreCalcBasicYearsAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreCalcBasicYearsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
