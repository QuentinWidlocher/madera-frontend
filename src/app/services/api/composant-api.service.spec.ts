import { TestBed } from '@angular/core/testing';

import { ComposantApiService } from './composant-api.service';

describe('ComposantApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComposantApiService = TestBed.get(ComposantApiService);
    expect(service).toBeTruthy();
  });
});
