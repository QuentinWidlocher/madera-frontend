import { TestBed } from '@angular/core/testing';

import { GammeApiService } from './gamme-api.service';

describe('GammeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GammeApiService = TestBed.get(GammeApiService);
    expect(service).toBeTruthy();
  });
});
