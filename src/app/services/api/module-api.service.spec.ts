import { TestBed } from '@angular/core/testing';

import { ModuleApiService } from './module-api.service';

describe('ModuleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleApiService = TestBed.get(ModuleApiService);
    expect(service).toBeTruthy();
  });
});
