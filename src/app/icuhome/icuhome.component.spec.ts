import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcuhomeComponent } from './icuhome.component';

describe('IcuhomeComponent', () => {
  let component: IcuhomeComponent;
  let fixture: ComponentFixture<IcuhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcuhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcuhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
