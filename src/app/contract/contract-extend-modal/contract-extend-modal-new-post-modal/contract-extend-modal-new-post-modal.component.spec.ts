import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContractExtendModalNewPostModalComponent } from './contract-extend-modal-new-post-modal.component';

describe('ContractExtendModalNewPostModalComponent', () => {
  let component: ContractExtendModalNewPostModalComponent;
  let fixture: ComponentFixture<ContractExtendModalNewPostModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractExtendModalNewPostModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractExtendModalNewPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
