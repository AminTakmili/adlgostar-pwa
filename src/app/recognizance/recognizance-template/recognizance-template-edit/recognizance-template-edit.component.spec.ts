import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecognizanceTemplateEditComponent } from './recognizance-template-edit.component';

describe('RecognizanceTemplateEditComponent', () => {
  let component: RecognizanceTemplateEditComponent;
  let fixture: ComponentFixture<RecognizanceTemplateEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecognizanceTemplateEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecognizanceTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
