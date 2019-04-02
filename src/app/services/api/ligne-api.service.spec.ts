import { TestBed } from '@angular/core/testing';

import { LigneApiService } from './ligne-api.service';

describe('LigneApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LigneApiService = TestBed.get(LigneApiService);
    expect(service).toBeTruthy();
  });
});
