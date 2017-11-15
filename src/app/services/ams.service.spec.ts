import { TestBed, inject } from '@angular/core/testing';

import { AmsService } from './ams.service';

describe('AmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmsService]
    });
  });

  it('should be created', inject([AmsService], (service: AmsService) => {
    expect(service).toBeTruthy();
  }));
});
