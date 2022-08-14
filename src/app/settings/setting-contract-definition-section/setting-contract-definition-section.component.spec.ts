import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingContractDefinitionSectionComponent } from './setting-contract-definition-section.component';

describe('SettingContractDefinitionSectionComponent', () => {
  let component: SettingContractDefinitionSectionComponent;
  let fixture: ComponentFixture<SettingContractDefinitionSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingContractDefinitionSectionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingContractDefinitionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
