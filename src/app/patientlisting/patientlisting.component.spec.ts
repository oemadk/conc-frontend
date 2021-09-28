import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlistingComponent } from './patientlisting.component';

describe('PatientlistingComponent', () => {
  let component: PatientlistingComponent;
  let fixture: ComponentFixture<PatientlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientlistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
