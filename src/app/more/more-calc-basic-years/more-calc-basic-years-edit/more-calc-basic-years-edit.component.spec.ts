import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreCalcBasicYearsEditComponent } from './more-calc-basic-years-edit.component';

describe('MoreCalcBasicYearsEditComponent', () => {
  let component: MoreCalcBasicYearsEditComponent;
  let fixture: ComponentFixture<MoreCalcBasicYearsEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreCalcBasicYearsEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreCalcBasicYearsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
