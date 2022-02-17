import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreSalaryConstantsAddComponent } from './more-salary-constants-add.component';

describe('MoreSalaryConstantsAddComponent', () => {
  let component: MoreSalaryConstantsAddComponent;
  let fixture: ComponentFixture<MoreSalaryConstantsAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreSalaryConstantsAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreSalaryConstantsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
