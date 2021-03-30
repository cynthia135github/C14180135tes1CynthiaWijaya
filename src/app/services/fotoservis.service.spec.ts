import { TestBed } from '@angular/core/testing';

import { FotoservisService } from './fotoservis.service';

describe('FotoservisService', () => {
  let service: FotoservisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoservisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
