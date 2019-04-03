import { TestBed } from '@angular/core/testing';

import { ProduitApiService } from './produit-api.service';

describe('ProduitApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProduitApiService = TestBed.get(ProduitApiService);
    expect(service).toBeTruthy();
  });
});
