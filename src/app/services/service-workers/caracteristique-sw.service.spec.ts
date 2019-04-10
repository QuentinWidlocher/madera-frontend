import { TestBed } from '@angular/core/testing';

import { CaracteristiqueSwService } from './caracteristique-sw.service';

describe('CaracteristiqueSwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaracteristiqueSwService = TestBed.get(CaracteristiqueSwService);
    expect(service).toBeTruthy();
  });
});
