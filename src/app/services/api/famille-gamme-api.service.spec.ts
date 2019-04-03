import { TestBed } from '@angular/core/testing';

import { FamilleGammeApiService } from './famille-gamme-api.service';

describe('FamilleGammeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilleGammeApiService = TestBed.get(FamilleGammeApiService);
    expect(service).toBeTruthy();
  });
});
