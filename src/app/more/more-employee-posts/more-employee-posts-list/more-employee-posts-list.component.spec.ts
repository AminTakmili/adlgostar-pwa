import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreEmployeePostsListComponent } from './more-employee-posts-list.component';

describe('MoreEmployeePostsListComponent', () => {
  let component: MoreEmployeePostsListComponent;
  let fixture: ComponentFixture<MoreEmployeePostsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreEmployeePostsListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreEmployeePostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
