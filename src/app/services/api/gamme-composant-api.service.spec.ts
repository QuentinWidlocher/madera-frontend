import { TestBed } from '@angular/core/testing';

import { GammeComposantApiService } from './gamme-composant-api.service';

describe('GammeComposantApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GammeComposantApiService = TestBed.get(GammeComposantApiService);
    expect(service).toBeTruthy();
  });
});
