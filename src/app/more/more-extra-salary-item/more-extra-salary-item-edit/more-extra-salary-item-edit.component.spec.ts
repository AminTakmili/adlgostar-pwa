import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreExtraSalaryItemEditComponent } from './more-extra-salary-item-edit.component';

describe('MoreExtraSalaryItemEditComponent', () => {
  let component: MoreExtraSalaryItemEditComponent;
  let fixture: ComponentFixture<MoreExtraSalaryItemEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreExtraSalaryItemEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreExtraSalaryItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
