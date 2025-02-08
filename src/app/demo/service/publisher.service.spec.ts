import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { PublisherService } from './publisher.service';

describe('PublisherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublisherService = TestBed.get(PublisherService);
    expect(service).toBeTruthy();
  });
});
