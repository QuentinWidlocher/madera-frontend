import { TestBed } from '@angular/core/testing';

import { DossierTechniqueApiService } from './dossier-technique-api.service';

describe('DossierTechniqueApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DossierTechniqueApiService = TestBed.get(DossierTechniqueApiService);
    expect(service).toBeTruthy();
  });
});
