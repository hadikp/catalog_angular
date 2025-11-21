import { Component } from '@angular/core';
import { inject, OnInit } from '@angular/core';
import { Catalog } from '../../common/catalog';
import { CatalogService } from '../../services/catalog-service';

@Component({
  selector: 'app-catalog-list',
  imports: [],
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
      console.log('MEGÉRKEZETT AZ ADAT:', data); // <--- Ezt figyeld a konzolon!
      this.catalogs = data;
    },
    error: (err) => {
      console.error('HIBA TÖRTÉNT:', err); // <--- Ha ide fut, akkor baj van
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
