import { TestBed, inject } from '@angular/core/testing';

import { BlogFromIdService } from './blog-from-id.service';

describe('BlogFromIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogFromIdService]
    });
  });

  it('should be created', inject([BlogFromIdService], (service: BlogFromIdService) => {
    expect(service).toBeTruthy();
  }));
});
