import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreCalcBasicYearsListComponent } from './more-calc-basic-years-list.component';

describe('MoreCalcBasicYearsListComponent', () => {
  let component: MoreCalcBasicYearsListComponent;
  let fixture: ComponentFixture<MoreCalcBasicYearsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreCalcBasicYearsListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreCalcBasicYearsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
