import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessEmployeeImporterComponent } from './business-employee-importer.component';

describe('BusinessEmployeeImporterComponent', () => {
  let component: BusinessEmployeeImporterComponent;
  let fixture: ComponentFixture<BusinessEmployeeImporterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessEmployeeImporterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessEmployeeImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
