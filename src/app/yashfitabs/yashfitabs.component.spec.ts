import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YashfitabsComponent } from './yashfitabs.component';

describe('YashfitabsComponent', () => {
  let component: YashfitabsComponent;
  let fixture: ComponentFixture<YashfitabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YashfitabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YashfitabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
