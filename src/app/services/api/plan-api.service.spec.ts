import { TestBed } from '@angular/core/testing';

import { PlanApiService } from './plan-api.service';

describe('PlanApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanApiService = TestBed.get(PlanApiService);
    expect(service).toBeTruthy();
  });
});
