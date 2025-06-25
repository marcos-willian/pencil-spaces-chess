import { TestBed } from '@angular/core/testing';

import { OnlineModeService } from './online-mode.service';

describe('OnlineModeService', () => {
  let service: OnlineModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
