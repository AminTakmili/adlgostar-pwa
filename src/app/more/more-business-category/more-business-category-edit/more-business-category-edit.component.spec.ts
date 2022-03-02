import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreBusinessCategoryEditComponent } from './more-business-category-edit.component';

describe('MoreBusinessCategoryEditComponent', () => {
  let component: MoreBusinessCategoryEditComponent;
  let fixture: ComponentFixture<MoreBusinessCategoryEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreBusinessCategoryEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreBusinessCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
