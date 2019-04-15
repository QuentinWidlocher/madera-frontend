import { TestBed } from '@angular/core/testing';

import { UniteApiService } from './unite-api.service';

describe('UniteApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniteApiService = TestBed.get(UniteApiService);
    expect(service).toBeTruthy();
  });
});
