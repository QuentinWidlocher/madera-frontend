import { TestBed } from '@angular/core/testing';

import { UtilisateurApiService } from './utilisateur-api.service';

describe('UtilisateurApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilisateurApiService = TestBed.get(UtilisateurApiService);
    expect(service).toBeTruthy();
  });
});
