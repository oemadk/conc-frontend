import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfaComponent } from './rfa.component';

describe('RfaComponent', () => {
  let component: RfaComponent;
  let fixture: ComponentFixture<RfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
