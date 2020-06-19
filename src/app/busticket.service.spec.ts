import { TestBed } from '@angular/core/testing';

import { BusticketService } from './busticket.service';

describe('BusticketService', () => {
  let service: BusticketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusticketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
