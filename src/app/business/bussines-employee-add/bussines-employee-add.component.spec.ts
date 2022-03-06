import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BussinesEmployeeAddComponent } from './bussines-employee-add.component';

describe('BussinesEmployeeAddComponent', () => {
  let component: BussinesEmployeeAddComponent;
  let fixture: ComponentFixture<BussinesEmployeeAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinesEmployeeAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BussinesEmployeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
