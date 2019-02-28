import { TestBed } from '@angular/core/testing';

import { DateserviceService } from './dateservice.service';

describe('DateserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateserviceService = TestBed.get(DateserviceService);
    expect(service).toBeTruthy();
  });
});
