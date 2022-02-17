import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreExtraSalaryItemListComponent } from './more-extra-salary-item-list.component';

describe('MoreExtraSalaryItemListComponent', () => {
  let component: MoreExtraSalaryItemListComponent;
  let fixture: ComponentFixture<MoreExtraSalaryItemListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreExtraSalaryItemListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreExtraSalaryItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
