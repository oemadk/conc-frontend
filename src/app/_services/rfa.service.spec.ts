import { TestBed } from '@angular/core/testing';

import { RfaService } from './rfa.service';

describe('RfaService', () => {
  let service: RfaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
