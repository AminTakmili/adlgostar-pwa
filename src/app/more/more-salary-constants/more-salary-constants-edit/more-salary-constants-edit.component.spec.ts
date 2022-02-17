import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreSalaryConstantsEditComponent } from './more-salary-constants-edit.component';

describe('MoreSalaryConstantsEditComponent', () => {
  let component: MoreSalaryConstantsEditComponent;
  let fixture: ComponentFixture<MoreSalaryConstantsEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreSalaryConstantsEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreSalaryConstantsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
