import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreBusinessCategoryAddComponent } from './more-business-category-add.component';

describe('MoreBusinessCategoryAddComponent', () => {
  let component: MoreBusinessCategoryAddComponent;
  let fixture: ComponentFixture<MoreBusinessCategoryAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreBusinessCategoryAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreBusinessCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
