import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreExtraSalaryItemAddComponent } from './more-extra-salary-item-add.component';

describe('MoreExtraSalaryItemAddComponent', () => {
  let component: MoreExtraSalaryItemAddComponent;
  let fixture: ComponentFixture<MoreExtraSalaryItemAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreExtraSalaryItemAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreExtraSalaryItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
