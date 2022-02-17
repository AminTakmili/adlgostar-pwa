import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreSalaryConstantsComponent } from './more-salary-constants.component';

describe('MoreSalaryConstantsComponent', () => {
  let component: MoreSalaryConstantsComponent;
  let fixture: ComponentFixture<MoreSalaryConstantsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreSalaryConstantsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreSalaryConstantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
