import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreBusinessSubcategoryListComponent } from './more-business-subcategory-list.component';

describe('MoreBusinessSubcategoryListComponent', () => {
  let component: MoreBusinessSubcategoryListComponent;
  let fixture: ComponentFixture<MoreBusinessSubcategoryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreBusinessSubcategoryListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreBusinessSubcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
