import { TestBed } from '@angular/core/testing';

import { PrtuService } from './prtu.service';

describe('PrtuService', () => {
  let service: PrtuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrtuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
