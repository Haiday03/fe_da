import { TestBed } from '@angular/core/testing';

import { ShowmessageService } from './showmessage.service';

describe('ShowmessageService', () => {
  let service: ShowmessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowmessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
