import { TestBed } from '@angular/core/testing';

import { CctpApiService } from './cctp-api.service';

describe('CctpApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CctpApiService = TestBed.get(CctpApiService);
    expect(service).toBeTruthy();
  });
});
