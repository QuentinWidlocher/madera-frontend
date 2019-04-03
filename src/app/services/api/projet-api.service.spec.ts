import { TestBed } from '@angular/core/testing';

import { ProjetApiService } from './projet-api.service';

describe('ProjetApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjetApiService = TestBed.get(ProjetApiService);
    expect(service).toBeTruthy();
  });
});
