import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YashfitemplateComponent } from './yashfitemplate.component';

describe('YashfitemplateComponent', () => {
  let component: YashfitemplateComponent;
  let fixture: ComponentFixture<YashfitemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YashfitemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YashfitemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
