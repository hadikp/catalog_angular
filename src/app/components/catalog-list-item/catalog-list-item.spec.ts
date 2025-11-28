import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogListItem } from './catalog-list-item';

describe('CatalogListItem', () => {
  let component: CatalogListItem;
  let fixture: ComponentFixture<CatalogListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
