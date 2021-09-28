import { TestBed } from '@angular/core/testing';

import { RecordMicService } from './record-mic.service';

describe('RecordMicService', () => {
  let service: RecordMicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordMicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
