import { TestBed } from '@angular/core/testing';

import { FamilleComposantApiService } from './famille-composant-api.service';

describe('FamilleComposantApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilleComposantApiService = TestBed.get(FamilleComposantApiService);
    expect(service).toBeTruthy();
  });
});
