import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreExtraSalaryItemComponent } from './more-extra-salary-item.component';

describe('MoreExtraSalaryItemComponent', () => {
  let component: MoreExtraSalaryItemComponent;
  let fixture: ComponentFixture<MoreExtraSalaryItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreExtraSalaryItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreExtraSalaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
