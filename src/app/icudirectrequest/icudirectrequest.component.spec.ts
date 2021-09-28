import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcudirectrequestComponent } from './icudirectrequest.component';

describe('IcudirectrequestComponent', () => {
  let component: IcudirectrequestComponent;
  let fixture: ComponentFixture<IcudirectrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcudirectrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcudirectrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
