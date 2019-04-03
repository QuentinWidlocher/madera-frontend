import { TestBed } from '@angular/core/testing';

import { CaracteristiqueApiService } from './caracteristique-api.service';

describe('CaracteristiqueApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaracteristiqueApiService = TestBed.get(CaracteristiqueApiService);
    expect(service).toBeTruthy();
  });
});
