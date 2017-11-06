import { TestBed, inject } from '@angular/core/testing';

import { ZzService } from './zz.service';

describe('ZzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZzService]
    });
  });

  it('should be created', inject([ZzService], (service: ZzService) => {
    expect(service).toBeTruthy();
  }));
});
