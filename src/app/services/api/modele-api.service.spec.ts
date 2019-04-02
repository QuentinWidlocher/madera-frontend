import { TestBed } from '@angular/core/testing';

import { ModeleApiService } from './modele-api.service';

describe('ModeleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeleApiService = TestBed.get(ModeleApiService);
    expect(service).toBeTruthy();
  });
});
