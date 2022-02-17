import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreSalaryConstantsListComponent } from './more-salary-constants-list.component';

describe('MoreSalaryConstantsListComponent', () => {
  let component: MoreSalaryConstantsListComponent;
  let fixture: ComponentFixture<MoreSalaryConstantsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreSalaryConstantsListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreSalaryConstantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
