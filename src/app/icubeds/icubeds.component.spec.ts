import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcubedsComponent } from './icubeds.component';

describe('IcubedsComponent', () => {
  let component: IcubedsComponent;
  let fixture: ComponentFixture<IcubedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcubedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcubedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
