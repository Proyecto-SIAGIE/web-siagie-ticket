import { TestBed } from '@angular/core/testing';

import { GestorGlpiService } from './gestor-glpi.service';

describe('GestorGlpiService', () => {
  let service: GestorGlpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorGlpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
