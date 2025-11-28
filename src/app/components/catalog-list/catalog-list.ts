import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Catalog } from '../../common/catalog';
import { CatalogService } from '../../services/catalog-service';

@Component({
  selector: 'app-catalog-list',
  imports: [RouterLink],
  templateUrl: './catalog-list.html',
  styleUrl: './catalog-list.css',
})
export class CatalogList implements OnInit {

  private catalogService = inject(CatalogService)

  catalogs: Catalog[] = [];

  ngOnInit(): void {
    this.listCatalog();
  }

  listCatalog() {
    this.catalogService.getCatalogList().subscribe({
      next: (data) => {
        console.log('MEGÉRKEZETT AZ ADAT:', data);
        this.catalogs = data;
      },
      error: (err) => {
        console.error('HIBA TÖRTÉNT:', err);
      }
    });
  }

  section = [
    {
      title: 'Catalog',
      open: true,
      items: []
    }
  ];

  toggleSection(section: any){
    section.open = !section.open;
  }

}
