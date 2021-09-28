import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessaginghomeComponent } from './messaginghome.component';

describe('MessaginghomeComponent', () => {
  let component: MessaginghomeComponent;
  let fixture: ComponentFixture<MessaginghomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessaginghomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessaginghomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
