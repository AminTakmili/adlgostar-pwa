import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreEmployeePostsEditComponent } from './more-employee-posts-edit.component';

describe('MoreEmployeePostsEditComponent', () => {
  let component: MoreEmployeePostsEditComponent;
  let fixture: ComponentFixture<MoreEmployeePostsEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreEmployeePostsEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreEmployeePostsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
