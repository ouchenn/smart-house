import { TestBed } from '@angular/core/testing';

import { FloorsroomsService } from './floorsrooms.service';

describe('FloorsroomsService', () => {
  let service: FloorsroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloorsroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
