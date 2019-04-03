import { TestBed } from '@angular/core/testing';

import { ClientApiService } from './client-api.service';

describe('ClientApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientApiService = TestBed.get(ClientApiService);
    expect(service).toBeTruthy();
  });
});
