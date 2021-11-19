import { TestBed } from '@angular/core/testing';

import { SetStorageService } from './set-storage.service';

describe('SetStorageService', () => {
  let service: SetStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
