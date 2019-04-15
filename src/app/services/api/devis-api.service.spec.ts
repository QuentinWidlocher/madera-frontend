import { TestBed } from '@angular/core/testing';

import { DevisApiService } from './devis-api.service';

describe('DevisApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevisApiService = TestBed.get(DevisApiService);
    expect(service).toBeTruthy();
  });
});
