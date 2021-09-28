import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfafilledComponent } from './rfafilled.component';

describe('RfafilledComponent', () => {
  let component: RfafilledComponent;
  let fixture: ComponentFixture<RfafilledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfafilledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfafilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
