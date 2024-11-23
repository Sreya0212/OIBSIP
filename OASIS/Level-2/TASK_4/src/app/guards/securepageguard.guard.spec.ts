import { TestBed } from '@angular/core/testing';

import { SecurepageguardGuard } from './securepageguard.guard';

describe('SecurepageguardGuard', () => {
  let guard: SecurepageguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecurepageguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
