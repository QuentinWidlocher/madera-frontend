import { TestBed } from '@angular/core/testing';

import { ClientSwService } from './client-sw.service';

describe('ClientSwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientSwService = TestBed.get(ClientSwService);
    expect(service).toBeTruthy();
  });
});
