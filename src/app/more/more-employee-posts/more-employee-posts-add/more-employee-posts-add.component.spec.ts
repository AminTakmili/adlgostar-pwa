import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreEmployeePostsAddComponent } from './more-employee-posts-add.component';

describe('MoreEmployeePostsAddComponent', () => {
  let component: MoreEmployeePostsAddComponent;
  let fixture: ComponentFixture<MoreEmployeePostsAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreEmployeePostsAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreEmployeePostsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
