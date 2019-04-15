import { TestBed } from '@angular/core/testing';

import { DeferredQueriesService } from './deferred-queries.service';

describe('DeferredQueriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeferredQueriesService = TestBed.get(DeferredQueriesService);
    expect(service).toBeTruthy();
  });
});
