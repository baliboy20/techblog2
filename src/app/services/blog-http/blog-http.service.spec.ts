import { TestBed, inject } from '@angular/core/testing';

import { BlogHttpService } from './blog-http.service';

describe('BlogHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogHttpService]
    });
  });

  it('should be created', inject([BlogHttpService], (service: BlogHttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should run as as a mockj', inject([BlogHttpService], (srv: BlogHttpService) => {
    expect(srv.mock()).toEqual('hello dolly');
  }));
});
