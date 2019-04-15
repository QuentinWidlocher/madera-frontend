import { TestBed } from '@angular/core/testing';

import { CoupeDePrincipeApiService } from './coupe-de-principe-api.service';

describe('CoupeDePrincipeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoupeDePrincipeApiService = TestBed.get(CoupeDePrincipeApiService);
    expect(service).toBeTruthy();
  });
});
