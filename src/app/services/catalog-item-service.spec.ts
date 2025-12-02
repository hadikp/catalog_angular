import { TestBed } from '@angular/core/testing';

import { CatalogItemService } from './catalog-item-service';

describe('CatalogItemService', () => {
  let service: CatalogItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
