import { TestBed, inject } from '@angular/core/testing';

import { WebApiAdminService } from './web-api-admin.service';

describe('WebApiAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebApiAdminService]
    });
  });

  it('should be created', inject([WebApiAdminService], (service: WebApiAdminService) => {
    expect(service).toBeTruthy();
  }));
});
